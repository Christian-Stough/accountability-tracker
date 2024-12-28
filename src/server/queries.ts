"use server";

import type { Session } from "next-auth";
import { db } from "./db";
import type { Tasks } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function getTasks(session: Session): Promise<Tasks[]> {
  // eslint-disable-next-line
  const tasks: Tasks[] = await db.tasks.findMany({
    where: {
      id: session.user.id,
    },
    orderBy: [
      {
        completed: "asc",
      },
      {
        taskId: "desc",
      },
    ],
  });

  return tasks;
}

export async function completeTask(taskId: number) {
  await db.tasks.updateMany({
    where: {
      taskId,
    },
    data: {
      completed: true,
    },
  });
  revalidatePath("/");
}

export async function addTask(id: string, name: string) {
  await db.tasks.create({
    data: {
      id: id,
      name: name,
      completed: false,
    },
  });

  revalidatePath("/");
}

export async function deleteTask(taskId: number) {
  await db.tasks.delete({
    where: {
      taskId,
    },
  });

  revalidatePath("/");
}
