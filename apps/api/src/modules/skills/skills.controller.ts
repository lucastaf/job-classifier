import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { SkillsService } from "./skills.service.js";
import { ApiOkResponse } from "@nestjs/swagger";
import { SkillCreateInputDTO, SkillDeleteOutputDTO, SkillItemByIDOutputDTO, SkillListItemDTO, SkillUpdateInputDTO } from "./dto/skill-item.dto.js";

@Controller("/skills")
export class SkillsController {
    public constructor(private service: SkillsService){}

    @Get("/")
    @ApiOkResponse({
        type: SkillListItemDTO,
        isArray: true
    })
    public ListSkills(){
        return this.service.ListSkills();
    }

    @Get("/:skill_id")
    @ApiOkResponse({
        type: SkillItemByIDOutputDTO 
    })
    public GetSkillById(@Param("skill_id") id: number) {
        return this.service.GetSkillByID(id);
    }

    @Post("/")
    @ApiOkResponse({
        type: SkillListItemDTO
    })
    public CreateSkill(@Body() body: SkillCreateInputDTO){
        return this.service.CreateSkill(body);
    }

    @Patch("/:skill_id")
    @ApiOkResponse({
        type: SkillListItemDTO
    })
    public UpdateSkill(@Param("skill_id") id: number, @Body() body: SkillUpdateInputDTO){
        return this.service.UpdateSkill(id, body);
    }

    @Delete("/:skill_id")
    @ApiOkResponse({
        type: SkillDeleteOutputDTO
    })
    public DeleteSkill(@Param(":skill_id") id: number){
        return this.service.DeleteSkill(id)
    }
}