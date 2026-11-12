import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsInt, IsNotEmpty, IsNumber, IsString, Max, Min } from "class-validator";

export class SkillBaseDTO {
    //Editable Fields
    @ApiProperty({ example: "Cool language" })
    @IsString({ message: "annotations must be an string" })
    @IsNotEmpty()
    annotations: string;

    @ApiProperty()
    @IsNumber({}, { message: "groupId must be an integer" })
    groupId: number;

    @ApiProperty({ example: new Date("2026-11-11T16:56:12.810Z") })
    @IsDateString()
    @IsNotEmpty()
    createdAt: Date;

    @ApiProperty({ example: "Javascript" })
    @IsString({ message: "Name must be an string" })
    @IsNotEmpty()
    name: string;

    @IsInt({ message: "Rating must be an int between 0 and 5" })
    @Min(0)
    @Max(5)
    @ApiProperty({example: 5})
    @ApiProperty()
    rating: number;

    //Output only Fields
    @ApiProperty()
    id: number;
    @ApiProperty({
        example: {
            id: 1,
            name: "Programming language"
        }
    })
    skillsGroup?: {
        createdAt?: any;
        id?: number;
        name: string;
    } | null;
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