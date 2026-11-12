import { PartialType, PickType } from "@nestjs/swagger";
import { KanbanBaseDTO } from "./kanban-base.dto.js";

//Output DTO
export class KanbanItemOutputDTO extends KanbanBaseDTO {}


// Input DTO
export class KanbanCreateInputDTO extends PickType(KanbanBaseDTO, ["columnName", "position"]) { }

export class KanbanUpdateInputDTO extends (PartialType(PickType(KanbanBaseDTO, ["columnName", "position"]))) { }