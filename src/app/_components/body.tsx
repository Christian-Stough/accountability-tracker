import React from "react";

import type { Session } from "next-auth";
import TaskList from "./task-list";
import BodyTabs from "./body-tabs";

export default function Body({ session }: { session: Session }) {
  return (
    <div className="flex w-full flex-col items-center gap-4">
      <BodyTabs />
      <TaskList session={session} />
    </div>
  );
}
