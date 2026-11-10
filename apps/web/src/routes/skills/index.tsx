import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { createFileRoute } from "@tanstack/react-router";
import SkillsCategories from "./_components/skills-categories";
import SkillsList from "./_components/skills-list";

export const Route = createFileRoute("/skills/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Tabs>
      <TabsList>
        <TabsTrigger value="skills">Skills</TabsTrigger>
        <TabsTrigger value="categories">Categories</TabsTrigger>
      </TabsList>
      <TabsContent value="skills">
        <Card>
          <CardContent>
            <SkillsList/>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="categories">
        <Card>
          <CardContent>
            <SkillsCategories />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
