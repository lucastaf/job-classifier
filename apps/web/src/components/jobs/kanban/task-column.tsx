import { Badge } from "@/components/reui/badge";
import {
  KanbanColumn,
  KanbanColumnContent,
  KanbanColumnHandle,
} from "@/components/reui/kanban";
import { type ComponentProps } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { GripVerticalIcon } from "lucide-react";
import type { KanbanJob } from "@/api/generated/models";
import TaskCard from "./task-card";

interface TaskColumnProps extends Omit<
  ComponentProps<typeof KanbanColumn>,
  "children"
> {
  tasks: KanbanJob[];
  label?: string;
  isOverlay?: boolean;
}

export default function TaskColumn({
  value,
  tasks,
  isOverlay,
  label,
  ...props
}: TaskColumnProps) {
  const realLabel = label ?? value;
  return (
    <KanbanColumn value={value} {...props}>
      <Card className="mb-2.5">
        <CardHeader className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="text-sm font-semibold">{realLabel}</span>
            <Badge variant="outline">{tasks.length}</Badge>
          </div>
          <KanbanColumnHandle
            render={(props) => (
              <Button {...props} size="icon-xs" variant="ghost">
                <GripVerticalIcon />
              </Button>
            )}
          />
        </CardHeader>
        <CardContent>
          <KanbanColumnContent value={value} className="flex flex-col gap-2.5">
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                asHandle={!isOverlay}
                isOverlay={isOverlay}
              />
            ))}
          </KanbanColumnContent>
        </CardContent>
      </Card>
    </KanbanColumn>
  );
}
