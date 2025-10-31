import { ToastContainer } from "react-toastify";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import GameAchievements from "../shared/components/GameAchievements";

export default function TaskPage() {
  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <div className="flex xl:flex-row flex-col items-start gap-4">
        <div className="xl:w-1/2 w-full">
          <GameAchievements />
        </div>
        <div className="w-full">
          <h1 className="text-2xl font-bold mb-6">🧠 Taskly Board</h1>
          <TaskForm />
          <TaskList />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
