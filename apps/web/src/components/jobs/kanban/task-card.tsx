import { KanbanItem, KanbanItemHandle } from "@/components/reui/kanban";
import { type ComponentProps } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "@tanstack/react-router";
import { format } from "date-fns";
import type { KanbanJob } from "@/api/generated/models";
import { Rating } from "@/components/reui/rating";

interface TaskCardProps extends Omit<
  ComponentProps<typeof KanbanItem>,
  "value" | "children"
> {
  task: KanbanJob;
  asHandle?: boolean;
  isOverlay?: boolean;
}

export default function TaskCard({
  task,
  asHandle,
  isOverlay,
  ...props
}: TaskCardProps) {
  const navigate = useNavigate();

  const cardContent = (
    <Card>
      <CardContent
        onDoubleClick={() => {
          navigate({
            to: `/jobs/${task.id}`,
          });
        }}
        className="space-y-2.5"
      >
        <div className="flex items-center justify-between gap-2">
          <span className="line-clamp-1 text-sm font-medium">{task.title}</span>
          <Rating rating={task.rating} />
        </div>
        <div className="text-muted-foreground flex items-center justify-between text-xs">
          <div>{task.companyName}</div>
          {task.applicationDate && (
            <time className="text-[10px] whitespace-nowrap tabular-nums">
              {format(task.applicationDate, "dd/MM/yyyy HH:mm")}
            </time>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <KanbanItem value={String(task.id)} {...props}>
      {asHandle && !isOverlay ? (
        <KanbanItemHandle>{cardContent}</KanbanItemHandle>
      ) : (
        cardContent
      )}
    </KanbanItem>
  );
}
