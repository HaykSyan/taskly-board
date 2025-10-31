"use client";
import { create } from "zustand";
import { fetchTasks, updateTasks, deleteTask } from "../actions";

import { Task } from "../schemas/taskSchema";
import { updateProgress } from "@/app/shared/store/useGameStore";

type TaskState = {
  tasks: Task[];
  loading: boolean;
  load: () => Promise<void>;
  addOptimistic: (task: Task) => void;
  replaceTask: (tempId: string, real: Task) => void;
  removeTask: (id: string) => void;
};

export const useTaskStore = create<TaskState>((set) => ({
  tasks: [],
  loading: true,

  load: async () => {
    const data = await fetchTasks();
    set({ tasks: data.mockTasks, loading: false });

    // Update gamification
    const completedCount = data.completedTaskCount;
    updateProgress(completedCount);
  },

  addOptimistic: (task) => set((s) => ({ tasks: [task, ...s.tasks] })),

  replaceTask: (tempId, real) => {
    set((s) => ({
      tasks: s.tasks.map((t) => (t.id === tempId ? real : t)),
    }));
    updateTasks(tempId, real);
  },

  removeTask: (id) => {
    set((s) => ({
      tasks: s.tasks.filter((t) => t.id !== id),
    }));
    deleteTask(id);
  },
}));

export const useTasks = () => {
  const tasks = useTaskStore((state) => state.tasks);
  const loading = useTaskStore((state) => state.loading);
  return { tasks, loading };
};
export const load = () => useTaskStore.getState().load();
export const removeTask = (id: string) =>
  useTaskStore.getState().removeTask(id);
export const replaceTask = (tempId: string, real: Task) =>
  useTaskStore.getState().replaceTask(tempId, real);
export const addOptimistic = (task: Task) =>
  useTaskStore.getState().addOptimistic(task);
