import { ApiProperty } from "@nestjs/swagger";

export class SkillsListDTO {
    @ApiProperty({
        example: 1
    })
    id: number;
    @ApiProperty({
        example: new Date("2026-11-11T16:56:12.810Z")
    })
    createdAt: Date;
    @ApiProperty({
        example: "Javascript"
    })
    name: string;
    @ApiProperty({
        example: 5
    })
    rating: number;
    @ApiProperty({
        example: {
            id: 1,
            name: "Programming language"
        }
    })
    skillsGroup: {
        id: number;
        name: string;
    } | null;
}