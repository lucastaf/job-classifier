import RichTextEditor from "@/components/rich-text-editor";
import { Card, CardContent } from "@/components/ui/card";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/jobs/$jobId/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <Card>
        <CardContent>
            Title
        </CardContent>
      </Card>
      <Card className="mt-4">
        <CardContent>
            <RichTextEditor />
        </CardContent>
      </Card>
    </div>
  );
}
