import { useState, useMemo } from "react";
import useDebounce from "@/app/shared/hooks/useDebounce";

import type { Task } from "../schemas/taskSchema";

export function useTaskSearch(tasks: Task[]) {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300);

  const filteredTasks = useMemo(() => {
    if (!debouncedQuery.trim()) return tasks;

    try {
      // Escape special regex chars (to prevent invalid regex)
      const escaped = debouncedQuery.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const regex = new RegExp(escaped, "i");

      return tasks.filter((task) => regex.test(task.title));
    } catch {
      // fallback if user types invalid regex
      return tasks;
    }
  }, [debouncedQuery, tasks]);

  return { query, setQuery, filteredTasks };
}
