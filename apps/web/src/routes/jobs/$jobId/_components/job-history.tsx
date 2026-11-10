import HistoryItem from "@/components/history-component";
import {
  Timeline
} from "@/components/reui/timeline";
import { Card, CardContent } from "@/components/ui/card";
const roadmap = [
  {
    id: 1,
    date: new Date("Jan 2025"),
    title: "Description Changed",
    beforeValue: "On site Job",
    afterValue: "Remote job",
  },
  {
    id: 2,
    date: new Date("Feb 2025"),
    title: "Rating Changed",
    beforeValue: "3",
    afterValue: "4",
  },
  {
    id: 3,
    date: new Date("Mar 2025"),
    title: "Visual Theme Builder",
    beforeValue:
      "Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu...",
    afterValue:
      "aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos...",
  },
  {
    id: 4,
    date: new Date("Apr 2025"),
    title: "Annotations Changed ",
    beforeValue:
      "Role-based access control, SOC2 compliance audit, and enhanced data encryption protocols.",
    afterValue:
      "Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id ",
  },
];



export default function JobHistory() {
  return (
    <Card className="h-full">
      <CardContent className="h-full">
        <Timeline defaultValue={3} className="w-full max-w-md">
          {roadmap.map((item) => (
            <HistoryItem item={item} />
          ))}
        </Timeline>
      </CardContent>
    </Card>
  );
}
