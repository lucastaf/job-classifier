"use client";

import {
  Kanban,
  KanbanBoard,
  KanbanOverlay
} from "@/components/reui/kanban";
import { useEffect, useMemo, useState } from "react";

import {
  useJobsControllerUpdateJob,
  useKanbanControllerGetJobsKanban,
} from "@/api/generated";
import type { KanbanJob } from "@/api/generated/models";
import toast from "react-hot-toast";
import TaskColumn from "./task-column";

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

  const columnsMemo = useMemo<Record<string, KanbanJob[]> | undefined>(() => {
    if (kanbanData.data?.data) {
      const returnValue: Record<string, KanbanJob[]> = {};
      kanbanData.data.data.forEach((kanban) => {
        returnValue[kanban.id] = kanban.jobs;
      });
      return returnValue;
    }
    return undefined;
  }, [kanbanData]);

  const [columns, setColumns] = useState<Record<string, KanbanJob[]>>(
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
