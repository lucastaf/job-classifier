import { ApiProperty } from "@nestjs/swagger"
import { IsInt, IsString, Min } from "class-validator"

export class KanbanBaseDTO {
    //Editable Fields
    @ApiProperty()
    @IsString()
    columnName: string
    @ApiProperty()
    @IsInt({message: "Position must be an integer higher than 0 "})
    @Min(1)
    position: number

    //Output only fields
    @ApiProperty({
        type: () => String,
        format: 'date-time'
    })
    createdAt: Date
    @ApiProperty()
    id: number
}