import { DatabaseService } from "@/infra/db/database.service.js";
import { Injectable } from "@nestjs/common";
import { SkillCreateInputDTO, SkillCreateOutputDTO, SkillDeleteOutputDTO, SkillItemByIDOutputDTO, SkillListItemDTO, SkillUpdateInputDTO, SkillUpdateOutputDTO } from "./dto/skill-item.dto.js";

@Injectable()
export class SkillsService {
    public constructor(private db: DatabaseService) { }

    public async ListSkills(): Promise<SkillListItemDTO[]> {
        return this.db.client.Skills
            .select("id", "name", "rating", "createdAt")
            .include("skillsGroup", (skillGroup) => (
                skillGroup.select("id", "name")
            ))
            .all();
    }

    public async GetSkillByID(id: number): Promise<SkillItemByIDOutputDTO | null> {
        return this.db.client.Skills
            .where({ id: id })
            .select("id", "name", "rating", "createdAt", "annotations")
            .include("skillsGroup")
            .include("jobSkills", (jobSkill) => (
                jobSkill.include("job", (job) => (
                    job.select("title")
                ))
            ))
            .include("skillsHistories")
            .first()
    }

    public async CreateSkill(data: SkillCreateInputDTO): Promise<SkillCreateOutputDTO> {
        return this.db.client.Skills
            .create({
                annotations: data.annotations ?? "",
                name: data.name,
                groupId: data.groupId,
                rating: data.rating,
            })
    }

    public async UpdateSkill(id: number, data: SkillUpdateInputDTO): Promise<SkillUpdateOutputDTO | null> {
        const fields = Object.keys(data) as Array<keyof SkillUpdateInputDTO>;
        const currentData = await this.db.client.Skills
            .where({ id: id })
            .firstOrThrow();

        const buildSkillHistoryEntries = fields.map((field) => ({
            field: field,
            newValue: String(data[field]),
            oldValue: String(currentData[field]),
            skillId: id
        }));

        await this.db.client.SkillsHistory.createAll(buildSkillHistoryEntries);

        return this.db.client.Skills
            .where({ id: id })
            .update(data);
    }

    public async DeleteSkill(id: number): Promise<SkillDeleteOutputDTO | null> {
        return this.db.client.Skills
            .where({ id: id })
            .delete();
    }
}