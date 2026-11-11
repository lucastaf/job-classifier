import { db } from "@job-classifier/db";
import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class DatabaseService implements OnModuleDestroy, OnModuleInit {
    private readonly db = db;
    public readonly client: typeof db.orm.public = this.db.orm.public;

    public constructor(private config : ConfigService) {}

    async onModuleInit() {
        const databaseUrl = this.config.getOrThrow<string>("DATABASE_URL")

        await this.db.connect({
            url: databaseUrl,
        });
    }

    async onModuleDestroy() {
        await this.db.close();
    }
}