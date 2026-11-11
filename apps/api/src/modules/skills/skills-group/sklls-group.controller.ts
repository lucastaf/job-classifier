import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { SkillGroupService } from "./skills-group.service.js";
import { SkillGroupCreateDto, SkillGroupUpdateDto } from "./dto/skill-group-edit.dto.js";
import { ApiOkResponse } from "@nestjs/swagger";
import { SkillGroupItemDTO } from "./dto/skill-group-list.dto.js";

@Controller("/skills-group")
export class SkillsGroupController {
    public constructor(private service: SkillGroupService) { }

    @Get("/")
    @ApiOkResponse({
        description: "List available skill groups",
        type: SkillGroupItemDTO,
        isArray: true
    })
    public ListGroups() {
        return this.service.ListGroups();
    }

    @Post("/")
    @ApiOkResponse({
        description: "Creates a new skill group",
        type: SkillGroupItemDTO
    })
    public CreateGroup(@Body() body: SkillGroupCreateDto) {
        return this.service.CreateGroup(body);
    }

    @Put("/:skill_id")
    @ApiOkResponse({
        description: "Updates an skill group",
        type: SkillGroupItemDTO
    })
    public UpdateGroup(@Body() body: SkillGroupUpdateDto, @Param('id') id: number) {
        return this.service.UpdateGroup(id, body);
    }
}