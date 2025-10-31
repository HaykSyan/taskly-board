"use client";
import { useCallback, useEffect } from "react";
import { AnimatePresence } from "motion/react";
import TaskItem from "./TaskItem";
import { Input } from "@/app/shared/components/ui";

import { useTaskSearch } from "../hooks/useTaskSearch";
import { useGameStore } from "@/app/shared/store/useGameStore";
import { useTasks, load } from "../store/useTaskStore";

import { Task } from "../schemas/taskSchema";

export default function TaskList() {
  const { tasks, loading } = useTasks();
  const { query, setQuery, filteredTasks } = useTaskSearch(tasks);
  const { addCompleted } = useGameStore();

  useEffect(() => {
    load();
  }, []);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="grid gap-3 mt-6">
      <Input
        value={query}
        onChange={handleChange}
        disabled={!tasks.length}
        placeholder="Search tasks..."
        className={!tasks.length ? "opacity-50 cursor-not-allowed" : ""}
      />
      <AnimatePresence initial={false}>
        {filteredTasks.map((task: Task) => (
          <TaskItem task={task} key={task.id} addCompleted={addCompleted} />
        ))}
      </AnimatePresence>
    </div>
  );
}
