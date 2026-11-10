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

function AdditionalSkills(props: {
  skillName: string;
  skillPercentagem: number;
}) {
  const { skillName, skillPercentagem } = props;

  return (
    <div className="gap-2 mb-1 flex justify-between">
      {skillName} - {skillPercentagem}%
      <Button size="sm">
        <Plus />
      </Button>
    </div>
  );
}

export default function JobSkills() {
  return (
    <Card className="h-full">
      <CardContent>
        <SkillStatus skillName="C++" skillPercentagem={80} />
        <SkillStatus skillName="Javascript" skillPercentagem={80} />
        <SkillStatus skillName="AWS" skillPercentagem={50} />
        <SkillStatus skillName="Docker" skillPercentagem={30} />
        <div className="mt-8 mb-2">Additional Skills:</div>
        <AdditionalSkills skillName="Kubernetes" skillPercentagem={30} />
        <AdditionalSkills skillName="Azure" skillPercentagem={30} />
        <AdditionalSkills skillName="Linux" skillPercentagem={30} />
      </CardContent>
    </Card>
  );
}
