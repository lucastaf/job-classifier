import { Injectable } from "@nestjs/common";
import { DatabaseService } from "../../../infra/db/database.service.js";

@Injectable()
export class SkillGroupService {
    public constructor(private db: DatabaseService) {

    }


    public ListGroups(): any {
        return this.db.client.SkillsGroup.select("id", "name", "createdAt").all();
    }
}