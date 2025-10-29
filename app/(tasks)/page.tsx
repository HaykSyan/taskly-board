import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { TasksProvider } from "./context/TasksProvider";

export default function TaskPage() {
  return (
    <div className="max-w-xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">🧠 Taskly Board</h1>
      <TasksProvider>
        <TaskForm />
        <TaskList />
      </TasksProvider>
    </div>
  );
}
