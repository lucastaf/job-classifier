import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/ui/button";
import { Mail, Pencil, Phone } from "lucide-react";
import JobDescription from "./job-description";
import JobSkills from "./job-skills";
import JobHistory from "./job-history";
import type { historyItem } from "@/components/history-component";
import { useState } from "react";
import JobEditModal from "./job-edit-modal";

export default function JobSideMenu(props: {
  descriptionData: {
    email?: string;
    phone?: string;
    description?: string;
    applicationDate: string;
  };
  skillsData: {
    skills: Array<{ name: string; relevance: number; id: number }>;
    additionalSkills: string[];
  };
  historyData: historyItem[];
  onEditClick: () => void;
}) {
  const { descriptionData, historyData, skillsData, onEditClick } = props;

  return (
    <Tabs className="h-full">
      <div className="flex">
        <TabsList>
          <TabsTrigger value="description">Job Description</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>
        <div className="flex flex-1 justify-end">
          <Button onClick={onEditClick} size="icon" className={"ml-auto"}>
            <Pencil />
          </Button>
        </div>
      </div>
      <TabsContent value="description">
        <JobDescription
          description={descriptionData.description}
          email={descriptionData.email}
          phone={descriptionData.phone}
          applicationDate={descriptionData.applicationDate}
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
