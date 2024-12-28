"use client";

import { Tasks } from "@prisma/client";
import React, { useState } from "react";
import { Checkbox } from "~/components/ui/checkbox";
import { updateTask } from "~/server/queries";

export default function TaskCheckbox({ task }: { task: Tasks }) {
  const [clientChecked, isClientChecked] = useState(task.completed);

  async function handleCheckChange(checked: boolean) {
    isClientChecked(checked);
    updateTask(task.taskId, checked);
  }

  return (
    <div
      className={`flex w-full items-center justify-between rounded-sm p-4 ${clientChecked ? "bg-green-600/25 text-neutral-400" : null}`}
    >
      <Checkbox checked={clientChecked} onCheckedChange={handleCheckChange} />
      <div className={`text-lg ${clientChecked ? "line-through" : null}`}>
        {task.name}
      </div>
    </div>
  );
}
