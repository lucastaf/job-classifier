import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/ui/button";
import { Mail, Phone } from "lucide-react";
import JobDescription from "./job-description";
import JobSkills from "./job-skills";
import JobHistory from "./job-history";
import type { historyItem } from "@/components/history-component";

export default function JobSideMenu(props: {
  descriptionData: {
    email?: string;
    phone?: string;
    description?: string;
  };
  skillsData: {
    skills: Array<{ name: string; relevance: number; id: number }>;
    additionalSkills: string[];
  };
  historyData: historyItem[];
}) {
  const { descriptionData, historyData, skillsData } = props;

  return (
    <Tabs className="h-full">
      <TabsList>
        <TabsTrigger value="description">Job Description</TabsTrigger>
        <TabsTrigger value="skills">Skills</TabsTrigger>
        <TabsTrigger value="history">History</TabsTrigger>
      </TabsList>
      <TabsContent value="description">
        <JobDescription
          description={descriptionData.description}
          email={descriptionData.email}
          phone={descriptionData.phone}
        />
      </TabsContent>
      <TabsContent value="skills">
        <JobSkills
          skills={skillsData.skills}
          additionalSkills={skillsData.additionalSkills}
        />
      </TabsContent>
      <TabsContent value="history">
        <JobHistory data={historyData} />
      </TabsContent>
    </Tabs>
  );
}
