import { Module } from "@nestjs/common";
import { SkillGroupModule } from "./skills-group/skills-group.module.js";

@Module({
    imports: [SkillGroupModule],
    exports: [SkillGroupModule]
})
export class SkillsModule { }