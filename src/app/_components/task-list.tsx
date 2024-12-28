import type { Session } from "next-auth";
import React, { use, useActionState, useState } from "react";
import { addTask, getTasks } from "~/server/queries";
import { Checkbox } from "~/components/ui/checkbox";
import { Separator } from "~/components/ui/separator";
import TaskCheckbox from "./task-checkbox";
import { Tasks } from "@prisma/client";
import { Button } from "~/components/ui/button";
import { Check, Edit2Icon, PlusIcon, XIcon } from "lucide-react";
import { Input } from "~/components/ui/input";

export default function TaskList({
  session,
  tasks,
}: {
  session: Session;
  tasks: Tasks[];
}) {
  const [addMode, setAddMode] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);

  const [addError, addAction, addPending] = useActionState(async () => {
    const input = document.getElementById("add-input") as HTMLInputElement;

    const value = input.value;

    setAddMode(false);

    const newTask = await addTask(session.user.id, value);

    setClientTasks([...clientTasks, newTask]);
  }, null);

  const [clientTasks, setClientTasks] = useState<Tasks[]>(tasks);

  return (
    <div className="flex w-full max-w-[650px] flex-col gap-4">
      <div className="flex w-full justify-end gap-2">
        {
          <Button
            variant={addMode ? "destructive" : "default"}
            onClick={() => setAddMode(!addMode)}
            size="icon"
          >
            {addMode ? (
              <XIcon className="size-5" />
            ) : (
              <PlusIcon className="size-5" />
            )}
          </Button>
        }
        <Button
          onClick={() => setEditMode(!editMode)}
          size="icon"
          variant="outline"
        >
          <Edit2Icon className="size-4" />
        </Button>
      </div>
      <div className="flex w-full flex-col gap-2">
        {addMode && (
          <>
            <form
              action={addAction}
              className={`flex w-full items-center gap-2 rounded-sm p-4`}
            >
              <Input id="add-input" placeholder="Enter Task..." />
              <Button type="submit" size="icon">
                <Check className="size-5" />
              </Button>
            </form>
            <Separator className="w-full" />
          </>
        )}
        {clientTasks.map((task, index) => (
          <div
            className="flex flex-col gap-2"
            key={`${task.id}_${task.taskId}`}
          >
            <TaskCheckbox
              task={task}
              editable={editMode}
              clientTasks={clientTasks}
              setClientTasks={setClientTasks}
            />

            {index !== clientTasks.length - 1 && (
              <Separator className="w-full" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
