"use client";

import React from "react";
import { useStore } from "../_store";
import TaskList from "./task-list";
import { Session } from "next-auth";
import { Tasks } from "@prisma/client";

export default function BodyTabBodies({
  session,
  tasks,
}: {
  session: Session;
  tasks: Tasks[];
}) {
  const activeTab = useStore((state) => state.activeTab);

  if (activeTab === "list") return <TaskList tasks={tasks} session={session} />;
}
