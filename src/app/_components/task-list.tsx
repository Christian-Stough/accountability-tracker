import type { Session } from "next-auth";
import React from "react";
import { getTasks } from "~/server/queries";
import { Checkbox } from "~/components/ui/checkbox";

export default async function TaskList({ session }: { session: Session }) {
  const data = await getTasks(session);

  return (
    <div className="flex w-full max-w-[1000px] flex-col gap-0">
      {data.map((task) => (
        <div
          key={`${task.id}_${task.name}`}
          className="flex w-full justify-between rounded-sm px-2 py-4"
        >
          <Checkbox />
          <div className="text-lg">{task.name}</div>
        </div>
      ))}
    </div>
  );
}
