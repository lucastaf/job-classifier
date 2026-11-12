import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { SkillGroupService } from "./skills-group.service.js";
import { SkillGroupCreateDto, SkillGroupItemDTO, SkillGroupUpdateDto } from "./dto/skill-group-item.dto.js";
import { ApiOkResponse } from "@nestjs/swagger";

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

    @Put("/:group_id")
    @ApiOkResponse({
        description: "Updates an skill group",
        type: SkillGroupItemDTO
    })
    public UpdateGroup(@Body() body: SkillGroupUpdateDto, @Param('group_id') id: number) {
        return this.service.UpdateGroup(id, body);
    }

    @Delete("/:group_id")
    @ApiOkResponse({
        description: "Deletes an skill group",
        type: SkillGroupItemDTO
    })
    public deleteGroup(@Param('group_id') id: number) {
        return this.service.DeleteGroup(id);
    }
}