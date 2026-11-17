import { useJobsControllerGetJobsByID } from "@/api/generated";
import RichTextEditor from "@/components/rich-text-editor";
import { Button } from "@/ui/button";
import { createFileRoute, useParams } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import JobHeader from "./_components/job-header";
import JobSideMenu from "./_components/job-side-menu";

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

  const [editorContent, setEditorContent] = useState(JobData?.annotations ?? "");

  return (
    <div>
      <JobHeader
        companyName={JobData?.companyName}
        rating={JobData?.rating}
        skills={JobData?.jobSkills}
        title={JobData?.title}
      />
      <div className="flex mt-4 gap-4 items-stretch">
        <div className="flex-2">
          <RichTextEditor value={editorContent} onChange={setEditorContent} />
        </div>
        <div className="flex-1">
          <JobSideMenu
            descriptionData={{
              description: JobData?.description ?? undefined,
              email: JobData?.email ?? undefined,
              phone: JobData?.phone ?? undefined,
            }}
            historyData={JobData?.jobsHistories ?? []}
            skillsData={{
              skills:
                JobData?.jobSkills.map((item) => ({
                  id: item.skillId,
                  name: item.skill.name,
                  relevance: item.relevance,
                })) ?? [],
              additionalSkills: JobData?.metadata?.suggestedSkills ?? [],
            }}
          />
        </div>
      </div>
      <div className="mt-2 flex justify-end">
        <Button className={"text-lg"} size={"lg"}>Save</Button>
      </div>
    </div>
  );
}
