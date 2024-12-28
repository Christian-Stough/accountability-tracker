"use client";

import { Tasks } from "@prisma/client";
import { FileIcon, Trash2Icon } from "lucide-react";
import React, { useState } from "react";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import { changeTaskComplete, deleteTask } from "~/server/queries";

export default function TaskCheckbox({
  task,
  editable,
  clientTasks,
  setClientTasks,
}: {
  task: Tasks;
  editable: boolean;
  clientTasks: Tasks[];
  setClientTasks: React.Dispatch<React.SetStateAction<Tasks[]>>;
}) {
  const [clientChecked, isClientChecked] = useState(task.completed);

  async function handleChecked() {
    if (clientChecked) return;

    isClientChecked(true);
    changeTaskComplete(task.taskId, true);
  }

  async function handleUncheck() {
    console.log("Test");
    isClientChecked(false);
    changeTaskComplete(task.taskId, false);
  }

  async function handleDelete() {
    setClientTasks(clientTasks.filter((t) => t.taskId !== task.taskId));
    await deleteTask(task.taskId);
  }

  return (
    <div
      onClick={() => {
        if (!editable) handleChecked();
      }}
      className={`flex w-full items-center justify-between rounded-sm p-4 ${clientChecked ? "cursor-default bg-green-600/25 text-neutral-400" : "cursor-pointer"}`}
    >
      {editable ? (
        <div className="relative h-full w-10">
          <div className="absolute -bottom-[20px] flex gap-2">
            <Button
              className="w-fit !text-black hover:bg-blue-50 hover:text-blue-600"
              variant="ghost"
              onClick={(e) => {
                e.stopPropagation();
                handleUncheck();
              }}
            >
              <FileIcon className="size-2" />
            </Button>
            <Button
              className="w-fit !text-black hover:bg-red-50 hover:text-red-600"
              variant="ghost"
              onClick={(e) => {
                e.stopPropagation();
                handleDelete();
              }}
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
