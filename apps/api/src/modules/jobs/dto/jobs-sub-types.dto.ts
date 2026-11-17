import { KanbanBaseDTO } from "@/modules/kanban/dto/kanban-base.dto.js";
import { SkillListItemDTO } from "@/modules/skills/dto/skill-item.dto.js";
import { ApiProperty, PickType } from "@nestjs/swagger";

export class JobKanbanDTO extends PickType(KanbanBaseDTO, ["id", "columnName"]) { }

export class JobMetadataDTO {
    @ApiProperty({ isArray: true, type: () => String })
    suggestedSkills: readonly string[]
}

export class JobHistoryDTO {
    @ApiProperty()
    id: number;
    @ApiProperty({
        type: String,
        format: 'date-time',
    })
    createdAt: string;
    @ApiProperty()
    field: string;
    @ApiProperty()
    jobId: number;
    @ApiProperty()
    newValue: string;
    @ApiProperty()
    oldValue: string;
}
export class JobSkillsDTO {
    @ApiProperty()
    jobId: number;

    @ApiProperty()
    relevance: number;

    @ApiProperty()
    skillId: number;

    @ApiProperty({ type: () => SkillListItemDTO })
    skill: SkillListItemDTO;
}