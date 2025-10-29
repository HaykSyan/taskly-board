import { useEffect, useState } from "react";

import { fetchTasks } from "../actions";
import { Task } from "../schemas/taskSchema";

export default function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      const data = await fetchTasks();
      setTasks(data);
      setLoading(false);
    })();
  }, []);

  return { tasks, isLoading, setTasks };
}
