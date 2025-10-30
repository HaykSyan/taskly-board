import { useEffect, useState } from "react";

import { fetchTasks } from "../actions";
import { Task } from "../schemas/taskSchema";

export default function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    const data = await fetchTasks();
    setTasks(data);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const addOptimistic = (t: Task) => setTasks((prev) => [t, ...prev]);
  const replaceTask = (tempId: string, real: Task) =>
    setTasks((prev) => prev.map((p) => (p.id === tempId ? real : p)));
  const removeTask = (id: string) =>
    setTasks((prev) => prev.filter((p) => p.id !== id));
  const searchTask = (title: string) => {
    if (!title.trim()) return tasks;

    try {
      // Escape special regex chars (to prevent invalid regex)
      const escaped = title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const regex = new RegExp(escaped, "i"); // i = case-insensitive

      return tasks.filter((task) => regex.test(task.title));
    } catch {
      // fallback if user types invalid regex
      return tasks;
    }
  };

  return {
    tasks,
    loading,
    setTasks,
    addOptimistic,
    replaceTask,
    removeTask,
    load,
    searchTask,
  };
}
