import { ApiProperty } from "@nestjs/swagger";

export class SkillGroupCreateDto {
    @ApiProperty()
    name: string;
}

export class SkillGroupUpdateDto {
    @ApiProperty()
    name: string;
}