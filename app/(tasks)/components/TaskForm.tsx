"use client";
import { useForm } from "react-hook-form";
import { createTask } from "../actions";
import { Task, TaskSchema } from "../schemas/taskSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { Button, Input } from "@/app/components/ui";

export default function TaskForm() {
  const [isPending, startTransition] = useTransition();

  const { handleSubmit, reset, register } = useForm<Task>({
    resolver: zodResolver(TaskSchema),
    defaultValues: {
      title: "",
      description: "",
      // priority: "medium",
      // completed: false,
    },
  });

  const onSubmit = (data: Task) => {
    startTransition(async () => {
      await createTask(data);
      reset();
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex items-center gap-1">
      <Input
        {...register("title")}
        type="text"
        placeholder="Enter task name..."
      />
      <Input
        {...register("description")}
        type="text"
        placeholder="Optional short description"
      />
      <Button className="text-white bg-blue-600 hover:bg-blue-600/60">
        {isPending ? "Adding..." : "Add Task"}
      </Button>
    </form>
  );
}
