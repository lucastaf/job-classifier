import { Module } from "@nestjs/common";
import { SkillGroupModule } from "./skills-group/skills-group.module.js";
import { DatabaseModule } from "@/infra/db/database.module.js";
import { SkillsController } from "./skills.controller.js";
import { SkillsService } from "./skills.service.js";

@Module({
    providers: [SkillsService],
    controllers: [SkillsController],
    imports: [SkillGroupModule, DatabaseModule],
    exports: [SkillGroupModule]
})
export class SkillsModule { }