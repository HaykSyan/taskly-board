import { Task } from "../schemas/taskSchema";
import {
  Badge,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@/app/shared/components/ui";
import { FaRegTrashAlt, FaCheck } from "react-icons/fa";
import { motion } from "motion/react";
import { Button, StatusLifecycle } from "@/app/shared/components/ui";
import { useTasksCtx } from "../context/TasksProvider";

export default function TaskItem({ task }: { task: Task }) {
  const { removeTask, replaceTask } = useTasksCtx();
  const handleDelete = async (id: string) => {
    await removeTask(id);
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
        border: task.completed ? "1px solid var(--color-green-600)" : "",
      }}
      exit={{ opacity: 0, y: 20, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      layout
      className={`flex items-center justify-between bg-white dark:bg-neutral-800 rounded-lg ${
        task.status === "creating"
          ? "opacity-60 border border-yellow-600"
          : task.status === "failed"
          ? "border border-red-600"
          : ""
      } `}
    >
      <Card className="flex flex-col w-full">
        <CardHeader className="flex items-center justify-between w-full">
          <h3
            className={`font-semibold text-lg flex items-center gap-2 ${
              task.completed ? "line-through" : ""
            }`}
          >
            {task.title}
            <StatusLifecycle status={task.status} />
          </h3>
          <div className="flex items-center gap-1">
            {task.status === "done" &&
              (!task.completed ? (
                <Button
                  onClick={() =>
                    replaceTask(task.id!, { ...task, completed: true })
                  }
                  className="text-green-600 hover:text-green-600/60 !p-1"
                >
                  <FaCheck />
                </Button>
              ) : (
                <Badge priority="done" />
              ))}
            {task.status !== "creating" && (
              <Button
                onClick={() => handleDelete(task.id!)}
                className="text-red-600 hover:text-red-600/60 !p-1"
              >
                <FaRegTrashAlt />
              </Button>
            )}
          </div>
        </CardHeader>
        <CardBody className="flex-col">
          <p className="font-semibold text-sm">Description:</p>
          <p className="text-gray-400 mb-1">{task.description}</p>
        </CardBody>
        <CardFooter>
          <Badge priority={task.priority} />
        </CardFooter>
      </Card>
    </motion.div>
  );
}
