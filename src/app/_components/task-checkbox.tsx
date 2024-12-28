"use client";

import { Tasks } from "@prisma/client";
import { FileIcon, Trash2Icon } from "lucide-react";
import React, { useState } from "react";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import { completeTask, deleteTask } from "~/server/queries";

export default function TaskCheckbox({
  task,
  editable,
}: {
  task: Tasks;
  editable: boolean;
}) {
  const [clientChecked, isClientChecked] = useState(task.completed);

  async function handleCheckChange() {
    if (clientChecked) return;

    isClientChecked(true);
    completeTask(task.taskId);
  }

  async function handleDelete() {
    await deleteTask(task.taskId);
  }

  return (
    <div
      onClick={handleCheckChange}
      className={`flex w-full items-center justify-between rounded-sm p-4 ${clientChecked ? "cursor-default bg-green-600/25 text-neutral-400" : "cursor-pointer"}`}
    >
      {editable ? (
        <div className="relative h-full w-10">
          <div className="absolute -bottom-[20px] flex gap-2">
            <Button
              className="w-fit hover:bg-blue-50 hover:text-blue-600"
              variant="ghost"
            >
              <FileIcon className="size-2" />
            </Button>
            <Button
              className="w-fit hover:bg-red-50 hover:text-red-600"
              variant="ghost"
              onClick={handleDelete}
            >
              <Trash2Icon className="size-2" />
            </Button>
          </div>
        </div>
      ) : (
        <Checkbox disabled={clientChecked} checked={clientChecked} />
      )}
      <div className={`text-lg ${clientChecked ? "line-through" : null}`}>
        {task.name}
      </div>
    </div>
  );
}
