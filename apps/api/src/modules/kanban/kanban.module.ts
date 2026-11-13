import { Module } from "@nestjs/common";
import { KanbanController } from "./kanban.controller.js";
import { KanbanService } from "./kanban.service.js";
import { DatabaseModule } from "@/infra/db/database.module.js";

@Module({
    imports: [DatabaseModule],
    controllers: [KanbanController],
    providers: [KanbanService],
    exports: [KanbanService]
})
export class KanbanModule { }