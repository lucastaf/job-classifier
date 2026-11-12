import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { SkillsService } from "./skills.service.js";
import { ApiOkResponse } from "@nestjs/swagger";
import { SkillsListDTO } from "./dto/skill-list.dto.js";
import { SkillItemCompleteDTO } from "./dto/skill-item-complete.dto.js";
import { SkillUpdateInputDTO } from "./dto/skill-update.dto.js";
import { SkillCreateInputDTO } from "./dto/skill-create.dto.js";
import { SkillDeleteOutputDTO } from "./dto/skill-delete.dto.js";

@Controller("/skills")
export class SkillsController {
    public constructor(private service: SkillsService){}

    @Get("/")
    @ApiOkResponse({
        type: SkillsListDTO,
        isArray: true
    })
    public ListSkills(){
        return this.service.ListSkills();
    }

    @Get("/:skill_id")
    @ApiOkResponse({
        type: SkillItemCompleteDTO 
    })
    public GetSkillById(@Param("skill_id") id: number) {
        return this.service.GetSkillByID(id);
    }

    @Post("/")
    @ApiOkResponse({
        type: SkillsListDTO
    })
    public CreateSkill(@Body() body: SkillCreateInputDTO){
        return this.service.CreateSkill(body);
    }

    @Patch("/:skill_id")
    @ApiOkResponse({
        type: SkillsListDTO
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