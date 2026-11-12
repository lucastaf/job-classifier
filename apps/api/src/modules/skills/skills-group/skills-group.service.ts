import { Injectable } from "@nestjs/common";
import { DatabaseService } from "../../../infra/db/database.service.js";
import { SkillGroupCreateDto, SkillGroupItemDTO, SkillGroupUpdateDto } from "./dto/skill-group-item.dto.js";

@Injectable()
export class SkillGroupService {
    public constructor(private db: DatabaseService) {

    }


    public async ListGroups(): Promise<SkillGroupItemDTO[]> {
        return await this.db.client.SkillsGroup.select("id", "name", "createdAt").all();
    }

    public async CreateGroup(data: SkillGroupCreateDto): Promise<SkillGroupItemDTO> {
        return await this.db.client.SkillsGroup.create({
            name: data.name
        });
    }

    public async UpdateGroup(id: number, data: SkillGroupUpdateDto): Promise<SkillGroupItemDTO | null> {
        return await this.db.client.SkillsGroup
            .where({ id: id })
            .update({ name: data.name });

    }

    public async DeleteGroup(id: number): Promise<SkillGroupItemDTO | null> {
        return await this.db.client.SkillsGroup
            .where({ id: id })
            .delete();
    }
}