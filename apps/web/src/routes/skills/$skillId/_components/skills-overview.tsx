import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/ui/button";

function JobSkill(props: { title: string; relevance: number }) {
  const { relevance, title } = props;
  return (
    <div className="gap-2 grid grid-cols-3 mb-2">
      {title}
      <Progress className="w-full col-span-2" value={relevance} />
    </div>
  );
}

export default function SkillsOverview() {
  return (
    <Card className="h-full">
      <CardContent>
        <div>
          Type: <Button size="sm">Programming Language</Button>
        </div>
        <div className="mt-2 text-xs">Created At: 10/10/2025 10:30</div>
        <div className="mt-4">
          <div className="mb-2">Jobs:</div>
          <JobSkill title="Fullstack Developer" relevance={70} />
          <JobSkill title="QA Engineer" relevance={50} />
          <JobSkill title="Devops Developer" relevance={25} />
        </div>
      </CardContent>
    </Card>
  );
}
