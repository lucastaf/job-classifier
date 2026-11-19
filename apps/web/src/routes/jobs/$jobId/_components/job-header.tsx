import type { JobSkillsDTO } from "@/api/generated/models";
import { Rating } from "@/components/reui/rating";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/ui/button";
import { Badge, ExternalLink } from "lucide-react";
import { useMemo } from "react";

export default function JobHeader(props: {
  title?: string;
  skills?: JobSkillsDTO[];
  rating?: number;
  companyName?: string | null;
  jobLink?: string;
}) {
  const { companyName, rating, skills, title, jobLink } = props;
  const FirstSkills = useMemo(() => skills?.slice(0, 3) ?? [], [skills]);

  return (
    <Card>
      <CardContent>
        <CardTitle>
          <div className="flex justify-between">
            <div>{title}</div>
            <div className="flex gap-1">
              {FirstSkills.map((skill) => {
                return <Badge>{skill.skill.name}</Badge>;
              })}
            </div>
          </div>
        </CardTitle>
        <div className="flex justify-between items-end mt-1">
          <Rating rating={rating ?? 0} />
          <a target="_blank" href={jobLink} rel="noopener noreferrer">
            <Button size={"sm"}>
              {companyName ?? ""}
              <ExternalLink />
            </Button>
          </a>
        </div>
      </CardContent>
    </Card>
  );
}
