import { Optional } from "@nestjs/common"
import { ApiProperty } from "@nestjs/swagger"

export class SkillCreateInputDTO {
    @ApiProperty()
    @Optional()
    annotations?: string

    @ApiProperty()
    name: string
    @ApiProperty()
    groupId: number
    @ApiProperty()
    rating: number
}

export class SkillCreateOutputDTO {
    @ApiProperty()
    annotations: string;
    @ApiProperty()
    createdAt: Date;
    @ApiProperty()
    groupId: number;
    @ApiProperty()
    id: number;
    @ApiProperty()
    name: string;
    @ApiProperty()
    rating: number;
}