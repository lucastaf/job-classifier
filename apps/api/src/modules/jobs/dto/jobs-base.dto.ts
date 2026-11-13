import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsInt, IsNumber, IsString, Max, Min } from "class-validator";

export class JobsBaseDTO {
    @ApiProperty()
    title: string;
    @ApiProperty()
    @IsString()
    companyName: string;

    @ApiProperty()
    @IsString()
    annotations: string;
    @ApiProperty()
    @IsString()
    description: string;

    @ApiProperty()
    @IsString()
    jobLink: string;
    @ApiProperty()
    @IsInt()
    @Min(0)
    @Max(5)
    rating: number;

    @ApiProperty()
    @IsString()
    email: string;
    @ApiProperty()
    phone: string;

    @ApiProperty()
    @IsDateString()
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
    metadata: {
        suggestedSkills: string[];
    };
    @ApiProperty()
    kanbanStatus: {
        id: number;
        columnName: string;
    };
}