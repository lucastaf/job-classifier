import { Rating } from "@/components/reui/rating";
import RichTextEditor from "@/components/rich-text-editor";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/ui/button";
import { createFileRoute, useParams } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";
import JobSideMenu from "./_components/job-side-menu";
import { useJobsControllerGetJobsByID } from "@/api/generated";
import { useMemo, useState } from "react";

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

  const FirstSkills = useMemo(() => JobData?.jobSkills.slice(0, 3), [JobData]);

  return (
    <div>
      <Card>
        <CardContent>
          <CardTitle>
            <div className="flex justify-between">
              <div>{JobData?.title}</div>
              <div className="flex gap-1">
                {FirstSkills?.map((skill) => {
                  return <Badge>{skill.skill.name}</Badge>;
                })}
              </div>
            </div>
          </CardTitle>
          <div className="flex justify-between items-end mt-1">
            <Rating editable rating={JobData?.rating ?? 0} />
            <Button size={"sm"}>
              {JobData?.companyName ?? ""}
              <ExternalLink />
            </Button>
          </div>
        </CardContent>
      </Card>
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
    </div>
  );
}
