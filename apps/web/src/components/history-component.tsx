import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader } from "./ui/dialog";
import { TimelineContent, TimelineDate, TimelineHeader, TimelineIndicator, TimelineItem, TimelineSeparator, TimelineTitle } from "./reui/timeline";
import { CheckIcon } from "lucide-react";

type historyItem = {
    id: number,
    title: string,
    beforeValue: string,
    afterValue: string,
    date: Date
}

export default function HistoryItem(props: { item: historyItem }) {
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