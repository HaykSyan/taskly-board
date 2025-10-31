import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

export default function TaskPage() {
  return (
    <div className="col-span-2 px-4">
      <div className="flex xl:flex-row flex-col items-start gap-4">
        <div className="w-full">
          <h1 className="text-2xl font-bold mb-6">Taskly Board</h1>
          <TaskForm />
          <TaskList />
        </div>
      </div>
    </div>
  );
}
