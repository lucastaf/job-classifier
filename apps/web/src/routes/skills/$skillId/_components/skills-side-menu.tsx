import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SkillsOverview from "./skills-overview";
import SkillsHistory from "./skills-history";

export default function SkillsSideMenu() {
  return (
    <Tabs className="h-full">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="history">History</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <SkillsOverview />
      </TabsContent>
      <TabsContent value="history">
        <SkillsHistory />
      </TabsContent>
    </Tabs>
  );
}
