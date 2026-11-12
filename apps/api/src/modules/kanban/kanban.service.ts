import { DatabaseService } from "@/infra/db/database.service.js";
import { BadRequestException, Injectable } from "@nestjs/common";
import { KanbanCreateInputDTO, KanbanItemOutputDTO, KanbanUpdateInputDTO } from "./dto/kanban-column.dto.js";

@Injectable()
export class KanbanService {
    public constructor(private db: DatabaseService) { }

    private async _shiftAllAfterPosition(position: number, operation: "inc" | "dec", limitPosition?: number) {
        const operations = {
            inc: 1,
            dec: -1
        }

        const statusToUpdate = await this.db.client.KanbanStatus
            .where((status, fns) => fns.fns.and(
                status.position.gte(position),
                limitPosition ? (status.position.lte(limitPosition)) : true
            ))
            .select("id", "position")
            .all()

        await Promise.all(statusToUpdate.map(status =>
            this.db.client.KanbanStatus
                .where({ id: status.id })
                .update({ position: status.position + operations[operation] })
        ))
    }


    public async ListKanbanColumns(): Promise<KanbanItemOutputDTO[]> {
        return this.db.client.KanbanStatus
            .orderBy(status => status.position.asc()).all();

    }

    public async CreateKanbanColumn(data: KanbanCreateInputDTO): Promise<KanbanItemOutputDTO> {
        const lastPositionStatus = await this.db.client.KanbanStatus
            .orderBy(status => status.position.desc())
            .first();

        const lastPosition = lastPositionStatus ? lastPositionStatus.position + 1 : 1
        const realPosition = Math.min(lastPosition, data.position)

        //Equals means the position is the last position
        if (lastPosition != realPosition) {
            await this._shiftAllAfterPosition(realPosition, "inc")
        }

        return this.db.client.KanbanStatus.create({
            columnName: data.columnName,
            position: realPosition,
        });
    }


    public async UpdateKanbanColumn(id: number, data: KanbanUpdateInputDTO): Promise<KanbanItemOutputDTO | null> {
        if (data.position) {
            const currentData = await this.db.client.KanbanStatus
                .where({ id: id })
                .firstOrThrow();

            //Remaps all positions
            const operation = currentData.position > data.position ? "inc" : "dec";
            const min = Math.min(data.position, currentData.position);
            const max = Math.max(data.position, currentData.position);

            await this._shiftAllAfterPosition(min, operation, max);
        }

        return await this.db.client.KanbanStatus
            .where({ id: id })
            .update(data)



    }

    public async DeleteKanbanColumn(id: number): Promise<KanbanItemOutputDTO | null> {
        const jobsCount = await this.db.client.Jobs
            .where({ kanbanStatusId: id })
            .aggregate((a) => ({ total: a.count() }));

        if (jobsCount.total > 0) {
            throw new BadRequestException("Can't delete an status with jobs linked to it")
        }

        const deletedRegistry = await this.db.client.KanbanStatus
            .where({ id: id })
            .delete();

        if (deletedRegistry != null) {
            await this._shiftAllAfterPosition(deletedRegistry?.position, "dec")
        }

        return deletedRegistry;
    }
}