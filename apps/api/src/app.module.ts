import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { SkillsModule } from './modules/skills/skills.module.js';
import { ConfigModule } from "@nestjs/config";
import { KanbanModule } from './modules/kanban/kanban.module.js';
import { JobsModule } from './modules/jobs/jobs.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SkillsModule,
    KanbanModule,
    JobsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
