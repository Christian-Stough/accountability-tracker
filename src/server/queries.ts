"use server";

import type { Session } from "next-auth";
import { db } from "./db";
import type { Tasks } from "@prisma/client";

export async function getTasks(session: Session): Promise<Tasks[]> {
  // eslint-disable-next-line
  const tasks: Tasks[] = await db.tasks.findMany({
    where: {
      id: session.user.id,
    },
  });

  return tasks;
}

export async function updateTask(id: number, isChecked: boolean) {
  await db.tasks.updateMany({
    where: {
      taskId: id,
    },
    data: {
      completed: isChecked,
    },
  });
}
