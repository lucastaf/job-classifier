import { DatabaseService } from "@/infra/db/database.service.js";
import { Injectable } from "@nestjs/common";
import { JobsListItemDTO } from "./dto/jobs-item.dto.js";

@Injectable()
export class JobsService {
    public constructor(private db: DatabaseService) { }

    public async ListJobs(): Promise<JobsListItemDTO[]> {
        const result = await this.db.client.Jobs
            .select("title", "companyName", "applicationDate")
            .include("kanbanStatus", status => status.select("id", "columnName"))
            .all()

        return Array.from(result) as JobsListItemDTO[];
    }

    public GetJobByID() {

    }

    public CreateJob() {

    }

    public ReRunAIClassification() {

    }

    public UpdateJob() {

    }

    public DeleteJob() {

    }
}