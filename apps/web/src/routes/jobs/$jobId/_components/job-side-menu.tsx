import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/ui/button";
import { Mail, Phone } from "lucide-react";
import JobDescription from "./job-description";
import JobSkills from "./job-skills";
import JobHistory from "./job-history";

export default function JobSideMenu() {
  return (
    <Tabs className="h-full">
      <TabsList>
        <TabsTrigger value="description">Job Description</TabsTrigger>
        <TabsTrigger value="skills">Skills</TabsTrigger>
        <TabsTrigger value="history">History</TabsTrigger>
      </TabsList>
      <TabsContent value="description">
        <JobDescription />
      </TabsContent>
      <TabsContent value="skills">
        <JobSkills />
      </TabsContent>
      <TabsContent value="history">
        <JobHistory />
      </TabsContent>
    </Tabs>
  );
}
