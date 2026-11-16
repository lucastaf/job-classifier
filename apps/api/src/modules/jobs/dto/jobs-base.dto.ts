import { SkillListItemDTO } from "@/modules/skills/dto/skill-item.dto.js";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsInt, IsNumber, IsString, Max, Min } from "class-validator";

export class JobsBaseDTO {
    @ApiProperty({ example: "Full stack developer" })
    title: string;
    @ApiProperty({ example: "Software company", type: () => String, nullable: true })
    @IsString()
    companyName?: string | null;

    @ApiProperty()
    @IsString()
    annotations: string;

    @ApiProperty({
        example: `
            We are looking for a Full Stack Developer to build and maintain web applications. 
            You will work with the team to create user-friendly features using modern frontend and backend technologies. 
            Experience with TypeScript, React, Node.js, and SQL is a plus.
        `, type: () => String, nullable: true
    })
    @IsString()
    description: string;

    @ApiProperty({ example: "https://linkedin.com" })
    @IsString()
    jobLink: string;
    @ApiProperty({ example: 5 })
    @IsInt()
    @Min(0)
    @Max(5)
    rating: number;

    @ApiProperty({ example: "contact@company.com", type: () => String, nullable: true })
    @IsString()
    email?: string | null;
    @ApiProperty({ example: "9999999999", type: () => String, nullable: true })
    phone?: string | null;

    @ApiProperty({ example: "2024-08-17T14:32:10.000Z" })
    @Type(() => Date)
    @IsDate()
    applicationDate: Date;

    @ApiProperty()
    @IsNumber()
    kanbanStatusId: number;

    //OutputFields
    @ApiProperty()
    id: number;
    @ApiProperty()
    createdAt: Date;
    @ApiProperty({ type: () => JobMetadataDTO, nullable: true })
    metadata?: JobMetadataDTO | null;
    @ApiProperty()
    kanbanStatus: {
        id: number;
        columnName: string;
    };

    @ApiProperty({
        type: () => JobSkillsDTO,
        isArray: true,
    })
    jobSkills: JobSkillsDTO[];

    @ApiProperty({ type: () => JobHistoryDTO, isArray: true })
    jobsHistories: JobHistoryDTO[];
}

class JobMetadataDTO {
    @ApiProperty({ isArray: true, type: () => String })
    suggestedSkills: readonly string[]
}

class JobHistoryDTO {
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
class JobSkillsDTO {
    @ApiProperty()
    jobId: number;

    @ApiProperty()
    relevance: number;

    @ApiProperty()
    skillId: number;

    @ApiProperty({ type: () => SkillListItemDTO })
    skill: SkillListItemDTO;
}