import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { JobsService } from "./jobs.service.js";
import { JobCreateInputDTO, JobItemByIdDTO, JobItemOutputDTO, JobsListItemDTO, JobUpdateInputDTO } from "./dto/jobs-item.dto.js";
import { ApiOkResponse } from "@nestjs/swagger";

@Controller("/jobs")
export class JobsController {
    public constructor(private service: JobsService) { }

    @Get("/")
    @ApiOkResponse({
        type: JobsListItemDTO,
        isArray: true
    })
    public ListJobs(): Promise<JobsListItemDTO[]> {
        return this.service.ListJobs();
    }

    @Get("/:job_id")
    @ApiOkResponse({
        type: JobItemByIdDTO,
    })
    public GetJobsByID(@Param("job_id") id: number): Promise<JobItemByIdDTO> {
        return this.service.GetJobByID(id);
    }

    @Post("/")
    @ApiOkResponse({
        type: JobItemOutputDTO,
    })
    public CreateJob(@Body() body: JobCreateInputDTO): Promise<JobItemOutputDTO> {
        return this.service.CreateJob(body);
    }

    @Patch("/:job_id")
    @ApiOkResponse({
        type: JobItemOutputDTO,
        nullable: true
    })
    public UpdateJob(@Param("job_id") id: number, @Body() body: JobUpdateInputDTO): Promise<JobItemOutputDTO | null> {
        return this.service.UpdateJob(id, body);
    }

    @Delete("/:job_id")
    @ApiOkResponse({
        type: JobItemOutputDTO,
        nullable: true
    })
    public DeleteJob(@Param("job_id") id: number): Promise<JobItemOutputDTO | null> {
        return this.service.DeleteJob(id);
    }
}