import { useCallback, useRef } from "react";
import { motion } from "motion/react";
import {
  Badge,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@/app/shared/components/ui";
import { FaRegTrashAlt, FaCheck } from "react-icons/fa";
import { Button, StatusLifecycle } from "@/app/shared/components/ui";

import { Task } from "../schemas/taskSchema";
import { useTaskStore } from "../store/useTaskStore";

export default function TaskItem({
  task,
  addCompleted,
}: {
  task: Task;
  addCompleted: () => void;
}) {
  const { removeTask, replaceTask } = useTaskStore();

  const isCompletingRef = useRef(false);

  const handleComplete = useCallback(() => {
    if (task.completed || isCompletingRef.current) return;

    isCompletingRef.current = true;
    replaceTask(task.id!, { ...task, completed: true });
    addCompleted();

    // Reset the ref after a short delay to allow for potential re-renders
    setTimeout(() => {
      isCompletingRef.current = false;
    }, 200);
  }, [task, replaceTask, addCompleted]);

  const handleDelete = useCallback(async () => {
    await removeTask(task.id!);
  }, [task, removeTask]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
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
      } ${task.completed ? "border border-green-600" : ""}`}
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
            {!task.completed ? (
              <Button
                onClick={handleComplete}
                className="text-green-600 hover:text-green-600/60 !p-1"
              >
                <FaCheck />
              </Button>
            ) : (
              <Badge priority="done" />
            )}
            {task.status !== "creating" && (
              <Button
                onClick={handleDelete}
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
