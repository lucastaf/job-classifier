import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/ui/button";
import { Plus } from "lucide-react";

function SkillStatus(props: { skillName: string; skillPercentagem: number }) {
  const { skillName, skillPercentagem } = props;

  return (
    <div className="gap-2 grid grid-cols-3 mb-2">
      {skillName}
      <Progress className="w-full col-span-2" value={skillPercentagem} />
    </div>
  );
}

function AdditionalSkills(props: { skillName: string }) {
  const { skillName } = props;

  return (
    <div className="gap-2 mb-1 flex justify-between">
      {skillName}
      <Button size="sm">
        <Plus />
      </Button>
    </div>
  );
}

export default function JobSkills(props: {
  skills: Array<{ name: string; relevance: number; id: number }>;
  additionalSkills: string[];
}) {
  const { additionalSkills, skills } = props;
  return (
    <Card className="h-full">
      <CardContent>
        {skills.map((skill) => (
          <SkillStatus
            key={skill.id}
            skillName={skill.name}
            skillPercentagem={skill.relevance}
          />
        ))}
        <div className="mt-8 mb-2">Additional Skills:</div>
        {additionalSkills.map((skill) => (
          <AdditionalSkills skillName={skill} />
        ))}
      </CardContent>
    </Card>
  );
}
