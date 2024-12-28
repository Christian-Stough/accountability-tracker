import type { Session } from "next-auth";
import React, { use } from "react";
import { getTasks } from "~/server/queries";
import { Checkbox } from "~/components/ui/checkbox";
import { Separator } from "~/components/ui/separator";
import TaskCheckbox from "./task-checkbox";
import { Tasks } from "@prisma/client";

export default function TaskList({
  session,
  tasks,
}: {
  session: Session;
  tasks: Tasks[];
}) {
  return (
    <div className="flex w-full max-w-[650px] flex-col gap-2">
      {tasks
        .sort((task) => {
          if (task.completed) return 1;
          else if (!task.completed) return -1;
          else return 0;
        })
        .map((task, index) => (
          <div
            className="flex flex-col gap-2"
            key={`${task.id}_${task.taskId}`}
          >
            <TaskCheckbox task={task} />

            {index !== tasks.length - 1 && <Separator className="w-full" />}
          </div>
        ))}
    </div>
  );
}
