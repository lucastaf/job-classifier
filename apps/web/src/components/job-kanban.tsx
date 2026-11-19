"use client";

import { Badge } from "@/components/reui/badge";
import {
  Kanban,
  KanbanBoard,
  KanbanColumn,
  KanbanColumnContent,
  KanbanColumnHandle,
  KanbanItem,
  KanbanItemHandle,
  KanbanOverlay,
} from "@/components/reui/kanban";
import { type ComponentProps, useEffect, useMemo, useState } from "react";

import {
  useJobsControllerUpdateJob,
  useKanbanControllerGetJobsKanban,
} from "@/api/generated";
import type { KanbanJob } from "@/api/generated/models";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { GripVerticalIcon } from "lucide-react";
import toast from "react-hot-toast";
import { Rating } from "./reui/rating";
import { format } from "date-fns";
import { useNavigate } from "@tanstack/react-router";

type Task = KanbanJob;

interface TaskCardProps extends Omit<
  ComponentProps<typeof KanbanItem>,
  "value" | "children"
> {
  task: Task;
  asHandle?: boolean;
  isOverlay?: boolean;
}

function TaskCard({ task, asHandle, isOverlay, ...props }: TaskCardProps) {
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

interface TaskColumnProps extends Omit<
  ComponentProps<typeof KanbanColumn>,
  "children"
> {
  tasks: Task[];
  label?: string;
  isOverlay?: boolean;
}

function TaskColumn({
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

export function JobsKanban() {
  const kanbanData = useKanbanControllerGetJobsKanban();
  const { mutateAsync: moveJob } = useJobsControllerUpdateJob();
  const columnsLabelsMemo = useMemo<Record<string, string>>(() => {
    if (kanbanData.data?.data) {
      const returnValue: Record<string, string> = {};
      kanbanData.data.data.forEach((column) => {
        returnValue[column.id] = column.columnName;
      });
      return returnValue;
    }
    return {};
  }, [kanbanData]);

  const columnsMemo = useMemo<Record<string, Task[]> | undefined>(() => {
    if (kanbanData.data?.data) {
      const returnValue: Record<string, Task[]> = {};
      kanbanData.data.data.forEach((kanban) => {
        returnValue[kanban.id] = kanban.jobs;
      });
      return returnValue;
    }
    return undefined;
  }, [kanbanData]);

  const [columns, setColumns] = useState<Record<string, Task[]>>(
    columnsMemo ?? {},
  );

  useEffect(() => {
    if (columnsMemo) setColumns(columnsMemo);
  }, [columnsMemo]);

  return (
    <Kanban
      value={columns}
      onValueChange={setColumns}
      onValueCommit={async (next, meta) => {
        if (meta.kind !== "item") return;

        const jobId = Number(meta.event.active.id);
        const kanbanStatusId = Number(meta.overContainer);
        try {
          await moveJob({
            jobId: jobId,
            data: {
              kanbanStatusId: kanbanStatusId,
            },
          });
        } catch (error) {
          // Rollback: restaura o estado anterior
          setColumns(meta.previousValue);

          toast.error("Error trying to move the job");
        }
      }}
      getItemValue={(item) => String(item.id)}
    >
      <KanbanBoard className="grid auto-rows-fr grid-cols-3">
        {Object.entries(columns).map(([columnValue, tasks]) => (
          <TaskColumn
            label={columnsLabelsMemo[columnValue]}
            key={columnValue}
            value={columnValue}
            tasks={tasks}
          />
        ))}
      </KanbanBoard>
      <KanbanOverlay className="bg-muted/10 rounded-md border-2 border-dashed" />
    </Kanban>
  );
}
