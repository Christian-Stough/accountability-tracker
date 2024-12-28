import React from "react";

import type { Session } from "next-auth";
import TaskList from "./task-list";
import BodyTabs from "./body-tabs";
import BodyTabBodies from "./body-tab-bodies";
import { getTasks } from "~/server/queries";

export default async function Body({ session }: { session: Session }) {
  const tasks = await getTasks(session);

  return (
    <div className="flex w-full flex-col items-center gap-4">
      <BodyTabs />
      <BodyTabBodies tasks={tasks} session={session} />
    </div>
  );
}
