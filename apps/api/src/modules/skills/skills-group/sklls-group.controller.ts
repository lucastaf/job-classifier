import { Controller, Get } from "@nestjs/common";
import { SkillGroupService } from "./skills-group.service.js";

@Controller("/skills-group")
export class SkillsGroupController {
    public constructor(private service: SkillGroupService) {}

    @Get("/")
    public ListGroups() {
        return this.service.ListGroups();
    }
}