"use server";

import { revalidatePath } from "next/cache";
import { Task, TaskSchema } from "../(tasks)/schemas/taskSchema";

let mockTasks: Task[] = [];
let completedTaskCount: number = 0;

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

export async function fetchTasks(): Promise<{
  mockTasks: Task[];
  completedTaskCount: number;
}> {
  return { mockTasks, completedTaskCount };
}

export async function updateTasks(id: string, payload: Task): Promise<Task[]> {
  if (payload.completed) completedTaskCount++;
  mockTasks = mockTasks.map((p) => (p.id === id ? payload : p));
  return mockTasks;
}

export async function deleteTask(id: string) {
  mockTasks = mockTasks.filter((t) => t.id !== id);
  revalidatePath("/");
}
