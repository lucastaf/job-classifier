import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { SkillsModule } from './modules/skills/skills.module.js';
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [SkillsModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
