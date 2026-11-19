import {
  jobsControllerUpdateJob,
  useJobsControllerGetJobsByID,
} from "@/api/generated";
import RichTextEditor from "@/components/rich-text-editor";
import { Button } from "@/ui/button";
import { createFileRoute, useParams } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import JobHeader from "./_components/job-header";
import JobSideMenu from "./_components/job-side-menu";
import { getChangedJson } from "@/lib/get-changed-json";
import {
  type JobItemByIdDTO,
  type JobUpdateInputDTO,
} from "@/api/generated/models";
import toast from "react-hot-toast";
import JobEditModal from "./_components/job-edit-modal";

export const Route = createFileRoute("/jobs/$jobId/")({
  component: RouteComponent,
});

function RouteComponent() {
  const JobId = useParams({
    from: "/jobs/$jobId/",
    select: (params) => params.jobId,
  });

  const JobRequest = useJobsControllerGetJobsByID(JobId);
  const JobData = useMemo(() => JobRequest.data?.data, [JobRequest]);

  const [editorContent, setEditorContent] = useState(
    JobData?.annotations ?? "",
  );
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    setEditorContent(JobData?.annotations ?? "");
  }, [JobData]);

  const saveContent = useCallback(
    (data: JobUpdateInputDTO) => {
      const editsJson = getChangedJson<JobItemByIdDTO>(JobData!, data);

      if (editsJson) {
        toast.promise(jobsControllerUpdateJob(JobId, editsJson), {
          loading: "Saving updates",
          error: "Job can't be updated",
          success: "Job Updated successfully",
        });
      }
    },
    [JobData],
  );

  return (
    <div>
      {JobData && (
        <JobEditModal
          open={openModal}
          setOpen={setOpenModal}
          data={JobData}
          onConfirm={saveContent}
        />
      )}
      <JobHeader
        companyName={JobData?.companyName}
        rating={JobData?.rating}
        skills={JobData?.jobSkills}
        title={JobData?.title}
        jobLink={JobData?.jobLink}
      />
      <div className="flex mt-4 gap-4 items-stretch">
        <div className="flex-2">
          <RichTextEditor
            value={editorContent}
            onChange={setEditorContent}
            additionalActions={
              <Button
                className={"ml-auto"}
                onClick={() => {
                  saveContent({
                    annotations: editorContent,
                  });
                }}
              >
                Save
              </Button>
            }
          />
        </div>
        <div className="flex-1">
          {JobData && (
            <JobSideMenu
              onEditClick={() => setOpenModal(true)}
              descriptionData={{
                description: JobData?.description ?? undefined,
                email: JobData?.email ?? undefined,
                phone: JobData?.phone ?? undefined,
                applicationDate: JobData?.applicationDate,
              }}
              historyData={JobData?.jobsHistories ?? []}
              skillsData={{
                skills:
                  JobData?.jobSkills?.map((item) => ({
                    id: item.skillId,
                    name: item.skill.name,
                    relevance: item.relevance,
                  })) ?? [],
                additionalSkills: JobData?.metadata?.suggestedSkills ?? [],
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
