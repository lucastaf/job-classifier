import { JobsKanban } from "@/components/job-kanban";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { createFileRoute } from "@tanstack/react-router";
import { JobsList } from "./_components/jobs-list";
import { Plus, PlusCircle } from "lucide-react";
import { Button } from "@/ui/button";
import JobCreateButton from "./_components/job-create-button";

export const Route = createFileRoute("/jobs/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Tabs>
      <div className="flex">
        <TabsList>
          <TabsTrigger value="kanban">Kanban</TabsTrigger>
          <TabsTrigger value="list">List</TabsTrigger>
        </TabsList>
        <div className="flex flex-1 justify-end">
          <JobCreateButton />
        </div>
      </div>
      <TabsContent value="kanban">
        <Card>
          <CardContent>
            <JobsKanban />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="list">
        <Card>
          <CardContent>
            <JobsList />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
