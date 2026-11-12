import { ApiProperty } from "@nestjs/swagger";

export class SkillItemCompleteDTO {
    @ApiProperty()
    annotations: string;
    @ApiProperty()
    createdAt: any;
    @ApiProperty()
    id: number;
    @ApiProperty()
    name: string;
    @ApiProperty()
    rating: number;
    @ApiProperty()
    skillsGroup: {
        createdAt: any;
        id: number;
        name: string;
    };
    @ApiProperty()
    jobSkills: {
        jobId: number;
        relevance: number;
        skillId: number;
        job: {
            title: string;
        } | null;
    }[];
    @ApiProperty()
    skillsHistories: {
        field: string,
        newValue: string,
        oldValue: string
    }[]

}