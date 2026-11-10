import { JobsKanban } from "@/components/job-kanban";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/jobs/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Tabs>
      <TabsList>
        <TabsTrigger value="kanban">Kanban</TabsTrigger>
        <TabsTrigger value="list">List</TabsTrigger>
      </TabsList>
      <TabsContent value="kanban">
        <Card>
          <CardContent>
            <JobsKanban />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
