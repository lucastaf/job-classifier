import { IntersectionType, OmitType, PartialType, PickType } from "@nestjs/swagger";
import { JobsBaseDTO } from "./jobs-base.dto.js";


//Output DTO 

export class JobsListItemDTO extends PickType(JobsBaseDTO, ["title", "companyName", "kanbanStatus", "applicationDate", "id"]) { }

export class JobItemOutputDTO extends OmitType(JobsBaseDTO, ["kanbanStatus", "jobSkills"]) {}

export class JobItemByIdDTO extends JobsBaseDTO { }

//Input DTO

export class JobCreateInputDTO extends IntersectionType(
    PickType(JobsBaseDTO, ["title", "jobLink", "applicationDate", "rating", "description"]),
    PartialType(PickType(JobsBaseDTO, ["companyName", "email", "phone"]))
) { }

export class JobUpdateInputDTO extends PartialType(PickType(JobsBaseDTO,
    ["title", "jobLink", "rating", "applicationDate", "description", "companyName", "email", "phone", "kanbanStatusId"]
)) { }