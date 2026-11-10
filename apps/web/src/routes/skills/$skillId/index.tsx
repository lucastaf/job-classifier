import { Rating } from "@/components/reui/rating";
import RichTextEditor from "@/components/rich-text-editor";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import JobSideMenu from "@/routes/jobs/$jobId/_components/job-side-menu";
import { Button } from "@/ui/button";
import { createFileRoute } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";
import SkillsSideMenu from "./_components/skills-side-menu";

export const Route = createFileRoute("/skills/$skillId/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <Card>
        <CardContent>
          <CardTitle>
            <div className="flex justify-between">
              <div>Javascript</div>
              <div>
                <Rating editable rating={4} />
              </div>
            </div>
          </CardTitle>
        </CardContent>
      </Card>
      <div className="flex mt-4 gap-4 items-stretch">
        <div className="flex-2">
          <RichTextEditor />
        </div>
        <div className="flex-1">
          <SkillsSideMenu />
        </div>
      </div>
    </div>
  );
}
