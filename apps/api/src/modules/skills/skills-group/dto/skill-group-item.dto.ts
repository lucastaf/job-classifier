import { PickType } from "@nestjs/swagger";
import { SkillGroupBaseDTO } from "./skill-group-base.dto.js";

//Output DTO
export class SkillGroupItemDTO extends SkillGroupBaseDTO { }


//Input DTO
export class SkillGroupCreateDto extends PickType(SkillGroupBaseDTO, ["name"]) { }

export class SkillGroupUpdateDto extends PickType(SkillGroupBaseDTO, ["name"]) { }
