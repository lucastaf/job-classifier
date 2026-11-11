import { ApiProperty } from "@nestjs/swagger";

export class SkillGroupItemDTO {
    @ApiProperty({
        example: 1
    })
    id: number;

    @ApiProperty({
        example: "Programming language"
    })
    name: string;

    @ApiProperty({
        example: new Date()
    })
    createdAt: Date
}