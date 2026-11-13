import { DatabaseService } from "@/infra/db/database.service.js";
import { Injectable } from "@nestjs/common";
import { JobCreateInputDTO, JobItemByIdDTO, JobItemOutputDTO, JobsListItemDTO, JobUpdateInputDTO } from "./dto/jobs-item.dto.js";
import { KanbanService } from "../kanban/kanban.service.js";
import { Temporal } from "temporal-polyfill";

@Injectable()
export class JobsService {
    public constructor(private db: DatabaseService, private kanbanService: KanbanService) { }

    private async _dispatchAIClassification(id: number) {

    }


    public async ListJobs(): Promise<JobsListItemDTO[]> {
        const result = await this.db.client.Jobs
            .select("title", "companyName", "applicationDate", "id")
            .include("kanbanStatus", status => status.select("id", "columnName"))
            .all()

        return Array.from(result) as JobsListItemDTO[];
    }

    public async GetJobByID(id: number): Promise<JobItemByIdDTO> {
        const result = await this.db.client.Jobs
            .where({ id: id })
            .include("jobSkills", jSkills => jSkills.include("skill"))
            .include("jobsHistories")
            .include("kanbanStatus")
            .firstOrThrow();

        return result;

    }

    public async CreateJob(data: JobCreateInputDTO): Promise<JobItemOutputDTO> {
        const firstColumn = await this.kanbanService.GetFirstColumn();


        const createdJob = await this.db.client.Jobs
            .create({
                ...data,
                annotations: "",
                kanbanStatusId: firstColumn.id,
                applicationDate: Temporal.Instant.from(
                    data.applicationDate.toISOString()
                ),
                metadata: {
                    suggestedSkills: []
                }
            });

        this._dispatchAIClassification(createdJob.id);

        return createdJob

    }


    public async UpdateJob(id: number, data: JobUpdateInputDTO): Promise<JobItemOutputDTO | null> {
        const fields = Object.keys(data) as Array<keyof JobUpdateInputDTO>;
        const currentData = await this.db.client.Jobs
            .where({ id: id })
            .firstOrThrow();

        const buildSkillHistoryEntries = fields.map((field) => ({
            field: field,
            newValue: String(data[field]),
            oldValue: String(currentData[field]),
            jobId: id
        }));

        await this.db.client.JobsHistory.createAll(buildSkillHistoryEntries);

        return this.db.client.Jobs
            .where({ id: id })
            .update({
                ...data,
                applicationDate: data.applicationDate ? Temporal.Instant.from(
                    data.applicationDate.toISOString()
                ) : undefined
            });
    }

    public async DeleteJob(id: number): Promise<JobItemOutputDTO | null> {
        return this.db.client.Jobs
            .where({ id: id })
            .delete()
    }


    public ReRunAIClassification(id: number) {
        this._dispatchAIClassification(id);
    }
}