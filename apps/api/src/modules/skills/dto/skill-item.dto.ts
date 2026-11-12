import { IntersectionType, OmitType, PartialType, PickType } from "@nestjs/swagger";
import { SkillBaseDTO } from "./skill-base.dto.js";

//Output DTOs

export class SkillItemByIDOutputDTO extends OmitType(SkillBaseDTO, ["groupId"]) { }

export class SkillListItemDTO extends PickType(SkillBaseDTO, ["id", "createdAt", "name", "rating", "skillsGroup"]) { }

export class SkillDeleteOutputDTO extends PickType(SkillBaseDTO, ["id", "createdAt", "name", "rating"]) { }

export class SkillCreateOutputDTO extends PickType(SkillBaseDTO, ["id", "annotations", "createdAt", "groupId", "name", "rating"]) { }

export class SkillUpdateOutputDTO extends PickType(SkillBaseDTO, ["id", "annotations", "name", "groupId", "rating", "createdAt"]) { }


//Input DTOs

export class SkillCreateInputDTO extends IntersectionType(
    PickType(SkillBaseDTO,["name", "groupId", "rating"]),
    PartialType(PickType(SkillBaseDTO, ["annotations"]))
) { }


export class SkillUpdateInputDTO extends PartialType(PickType(SkillBaseDTO, ["annotations", "name", "groupId", "rating"])) {}