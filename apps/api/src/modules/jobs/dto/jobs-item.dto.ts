import { PickType } from "@nestjs/swagger";
import { JobsBaseDTO } from "./jobs-base.dto.js";

export class JobsListItemDTO extends PickType(JobsBaseDTO, ["title", "companyName", "kanbanStatus", "applicationDate"]) { }