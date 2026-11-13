import { Module } from "@nestjs/common";
import { JobsService } from "./jobs.service.js";
import { KanbanService } from "../kanban/kanban.service.js";
import { DatabaseModule } from "@/infra/db/database.module.js";
import { KanbanModule } from "../kanban/kanban.module.js";
import { JobsController } from "./jobs.controller.js";

@Module({
    imports: [KanbanModule, DatabaseModule],
    providers: [JobsService],
    controllers: [JobsController],
})
export class JobsModule { }