import { ApiProperty, PartialType, PickType } from "@nestjs/swagger";
import { KanbanBaseDTO } from "./kanban-base.dto.js";
import { JobsBaseDTO } from "@/modules/jobs/dto/jobs-base.dto.js";

//Output DTO
export class KanbanItemOutputDTO extends KanbanBaseDTO { }

export class KanbanWithJobsOutputDTO extends KanbanBaseDTO {
    @ApiProperty({
        type: () => KanbanJob,
        isArray: true
    })
    jobs: KanbanJob[]
}

// Input DTO
export class KanbanCreateInputDTO extends PickType(KanbanBaseDTO, ["columnName", "position"]) { }

export class KanbanUpdateInputDTO extends (PartialType(PickType(KanbanBaseDTO, ["columnName", "position"]))) { }


//Extras
class KanbanJob extends PickType(JobsBaseDTO, ["id", "title", "rating", "companyName", "applicationDate"]) { }