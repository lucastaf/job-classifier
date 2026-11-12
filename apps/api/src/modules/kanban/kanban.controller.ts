import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ApiOkResponse } from "@nestjs/swagger";
import { KanbanService } from "./kanban.service.js";
import { KanbanCreateInputDTO, KanbanItemOutputDTO, KanbanUpdateInputDTO } from "./dto/kanban-column.dto.js";

@Controller("/kanban")
export class KanbanController {
    public constructor(private service: KanbanService) { }

    @Get("/")
    @ApiOkResponse({
        type: KanbanItemOutputDTO,
        isArray: true
    })
    public listColumns(): Promise<KanbanItemOutputDTO[]> {
        return this.service.ListKanbanColumns();
    }

    @Put("/:column_id")
    @ApiOkResponse({
        type: KanbanItemOutputDTO,
        nullable: true
    })
    public updateColumn(@Param("column_id") id: number, @Body() body: KanbanUpdateInputDTO): Promise<KanbanItemOutputDTO | null> {
        return this.service.UpdateKanbanColumn(id, body);
    }

    @Post("/")
    @ApiOkResponse({
        type: KanbanItemOutputDTO,
    })
    public createColumn(@Body() body: KanbanCreateInputDTO): Promise<KanbanItemOutputDTO> {
        console.log(body);
        return this.service.CreateKanbanColumn(body);
    }

    @Delete("/:column_id")
    @ApiOkResponse({
        type: KanbanItemOutputDTO,
        nullable: true
    })
    public deleteColumn(@Param("column_id") id: number): Promise<KanbanItemOutputDTO | null> {
        return this.service.DeleteKanbanColumn(id);
    }
}