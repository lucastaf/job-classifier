import { Rating } from "@/components/reui/rating";
import RichTextEditor from "@/components/rich-text-editor";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/ui/button";
import { createFileRoute } from "@tanstack/react-router";
import { ExternalLink, Mail, Phone } from "lucide-react";
import JobSideMenu from "./_components/job-side-menu";

export const Route = createFileRoute("/jobs/$jobId/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <Card>
        <CardContent>
          <CardTitle>
            <div className="flex justify-between">
              <div>JOB TITLE</div>
              <div className="flex gap-1">
                <Badge>Skill1</Badge>
                <Badge>Skill2</Badge>
                <Badge>Skill3</Badge>
              </div>
            </div>
          </CardTitle>
          <div className="flex justify-between items-end mt-1">
            <Rating editable rating={4} />
            <Button size={"sm"}>
              Company Name
              <ExternalLink />
            </Button>
          </div>
        </CardContent>
      </Card>
      <div className="flex mt-4 gap-4 items-stretch">
        <div className="flex-2">
          <RichTextEditor />
        </div>
        <div className="flex-1">
          <JobSideMenu />
        </div>
      </div>
    </div>
  );
}
