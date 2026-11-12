import { ApiProperty } from "@nestjs/swagger";
import { Optional } from "@nestjs/common";
import { IsInt, IsNumber, isNumber, IsPositive, Max, Min } from "class-validator";

export class SkillUpdateInputDTO {
    @ApiProperty()
    @Optional()
    annotations?: string

    @ApiProperty()
    @Optional()
    name?: string

    @ApiProperty()
    @Optional()
    groupId?: number

    @Optional()
    @IsInt({ message: "Rating must be a int between 0 and 5" })
    @Min(0)
    @Max(5)
    @ApiProperty()
    rating?: number
};

export class SkillUpdateOutputDTO {
    @ApiProperty()
    annotations: string;
    @ApiProperty()
    name: string;
    @ApiProperty()
    groupId: number;

    @ApiProperty()
    rating: number;
    @ApiProperty()
    createdAt: any;
    @ApiProperty()
    id: number;
}
