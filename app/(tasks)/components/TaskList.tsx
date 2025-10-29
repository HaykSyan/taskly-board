"use client";

import { Button, StatusLifecycle } from "@/app/components/ui";
import { useTasksCtx } from "../context/TasksProvider";
import { Task } from "../schemas/taskSchema";
import { Badge } from "@/app/components/ui";

export default function TaskList() {
  const { tasks, removeTask, loading } = useTasksCtx();
  if (loading) return <p>Loading...</p>;

  const handleDelete = async (id: string) => {
    await removeTask(id);
  };

  return (
    <div className="grid gap-3 mt-6">
      {tasks.map((task: Task) => (
        <div
          key={task.id}
          className={`flex items-center justify-between bg-white dark:bg-neutral-800 p-3 rounded-lg shadow ${
            task.status === "creating"
              ? "opacity-60 border border-yellow-600"
              : task.status === "failed"
              ? "border border-red-600"
              : ""
          }`}
        >
          <div className="flex flex-col gap-4">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              {task.title}
              <StatusLifecycle status={task.status} />
            </h3>
            <div>
              <p className="font-semibold text-sm">Description:</p>
              <p className="text-gray-400 mb-1">{task.description}</p>
            </div>
            <Badge priority={task.priority} />
          </div>
          {task.status !== "creating" && (
            <Button
              onClick={() => handleDelete(task.id!)}
              className="text-white bg-red-600 hover:bg-red-600/60"
            >
              Delete
            </Button>
          )}
        </div>
      ))}
    </div>
  );
}
