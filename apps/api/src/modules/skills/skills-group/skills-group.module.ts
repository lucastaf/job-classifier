import { Module } from "@nestjs/common";
import { SkillGroupService } from "./skills-group.service.js";
import { DatabaseModule } from "../../../infra/db/database.module.js";
import { SkillsGroupController } from "./sklls-group.controller.js";

@Module({
    providers: [SkillGroupService],
    controllers: [SkillsGroupController],
    exports: [SkillGroupService],
    imports: [DatabaseModule]
})
export class SkillGroupModule { };