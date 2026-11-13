import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsInt, IsNumber, IsString, Max, Min } from "class-validator";

export class JobsBaseDTO {
    @ApiProperty({ example: "Full stack developer" })
    title: string;
    @ApiProperty({ example: "Software company" })
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
        `
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

    @ApiProperty({ example: "contact@company.com" })
    @IsString()
    email?: string | null;
    @ApiProperty({ example: "9999999999" })
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
    @ApiProperty()
    metadata?: {
        suggestedSkills: readonly string[];
    } | null;
    @ApiProperty()
    kanbanStatus: {
        id: number;
        columnName: string;
    };

    @ApiProperty()
    jobSkills: {
        jobId: number;
        relevance: number;
        skillId: number;
        skill: {
            annotations: string;
            createdAt: any;
            id: number;
            rating: number;
            groupId: number;
            name: string;
        };
    }[];
}