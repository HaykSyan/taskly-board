"use server";

import { revalidatePath } from "next/cache";
import { Task, TaskSchema } from "../(tasks)/schemas/taskSchema";

let mockTasks: Task[] = [];

export async function createTask(form: unknown) {
  const parsed = TaskSchema.safeParse(form);

  if (!parsed.success) {
    throw new Error("Invalid task data");
  }
  const newTask = { ...parsed.data, id: crypto.randomUUID() };
  mockTasks.push(newTask);

  revalidatePath("/");
  return newTask;
}

export function fetchTasks() {
  return mockTasks;
}

export async function deleteTask(id: string) {
  mockTasks = mockTasks.filter((t) => t.id !== id);
  revalidatePath("/");
}
