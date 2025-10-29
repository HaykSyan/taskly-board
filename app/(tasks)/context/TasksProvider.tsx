"use client";
import React, { createContext, useContext } from "react";

import useTasks from "../hooks/useTasks";

import type { Task } from "@/app/(tasks)/schemas/taskSchema";

type Ctx = {
  tasks: Task[];
  loading: boolean;
  addOptimistic: (t: Task) => void;
  replaceTask: (tempId: string, real: Task) => void;
  removeTask: (id: string) => void;
  reload: () => Promise<void>;
};

const TasksContext = createContext<Ctx | undefined>(undefined);

export function TasksProvider({ children }: { children: React.ReactNode }) {
  const { tasks, loading, addOptimistic, replaceTask, removeTask, load } =
    useTasks();

  return (
    <TasksContext.Provider
      value={{
        tasks,
        loading,
        addOptimistic,
        replaceTask,
        removeTask,
        reload: load,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
}

export const useTasksCtx = () => {
  const ctx = useContext(TasksContext);
  if (!ctx) throw new Error("useTasksCtx must be used within TasksProvider");
  return ctx;
};
