import { Card, CardContent } from "@/components/ui/card";
import {
  Timeline,
  TimelineContent,
  TimelineDate,
  TimelineHeader,
  TimelineIndicator,
  TimelineItem,
  TimelineSeparator,
  TimelineTitle,
} from "@/components/reui/timeline";
import { CheckIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
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

function JobHistoryItem(props: { item: (typeof roadmap)[number] }) {
  const { item } = props;
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogContent className="max-w-200!">
        <DialogHeader>{item.title} - {item.date.toISOString()}</DialogHeader>
        <DialogDescription>
          <div className="grid grid-cols-2">
            <div>
              Before
              <div>{item.beforeValue}</div>
            </div>
            <div>
              After
              <div>{item.afterValue}</div>
            </div>
          </div>
        </DialogDescription>
      </DialogContent>
      <TimelineItem
        active={false}
        key={item.id}
        className="group-data-[orientation=vertical]/timeline:ms-10 cursor-pointer"
        onClick={() => setDialogOpen(true)}
      >
        <TimelineHeader>
          <TimelineSeparator className="group-data-[orientation=vertical]/timeline:-left-7 group-data-[orientation=vertical]/timeline:h-[calc(100%-1.5rem-0.25rem)] group-data-[orientation=vertical]/timeline:translate-y-6.5" />
          <TimelineDate>{item.date.toISOString()}</TimelineDate>
          <TimelineTitle>{item.title}</TimelineTitle>
          <TimelineIndicator className="group-data-completed/timeline-item:bg-primary group-data-completed/timeline-item:text-primary-foreground flex size-6 items-center justify-center group-data-completed/timeline-item:border-none group-data-[orientation=vertical]/timeline:-left-7">
            <CheckIcon className="size-4 group-not-data-completed/timeline-item:hidden" />
          </TimelineIndicator>
        </TimelineHeader>
        <TimelineContent>
          {item.beforeValue} {"->"} {item.afterValue}
        </TimelineContent>
      </TimelineItem>
    </Dialog>
  );
}

export default function JobHistory() {
  return (
    <Card className="h-full">
      <CardContent className="h-full">
        <Timeline defaultValue={3} className="w-full max-w-md">
          {roadmap.map((item) => (
            <JobHistoryItem item={item} />
          ))}
        </Timeline>
      </CardContent>
    </Card>
  );
}
