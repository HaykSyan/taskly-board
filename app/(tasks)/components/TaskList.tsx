"use client";
import { useTasksCtx } from "../context/TasksProvider";
import { Task } from "../schemas/taskSchema";
import { AnimatePresence } from "motion/react";
import TaskItem from "./TaskItem";
import { Input } from "@/app/shared/components/ui";
import { useTaskSearch } from "../hooks/useTaskSearch";
import { useCallback } from "react";
import { useGamification } from "../hooks/useGamification";

export default function TaskList() {
  const { tasks, loading } = useTasksCtx();
  const { query, setQuery, filteredTasks } = useTaskSearch(tasks);
  const { addCompleted } = useGamification();
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
