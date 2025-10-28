"use client";
import { useForm } from "react-hook-form";
import { createTask } from "../actions";
import { Task, TaskSchema } from "../schemas/taskSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { startTransition } from "react";

export default function TaskForm() {
  const { handleSubmit, reset, register } = useForm<Task>({
    resolver: zodResolver(TaskSchema),
    defaultValues: {
      title: "",
      // description: "",
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
      <input
        {...register("title")}
        type="text"
        placeholder="Enter task name..."
        className="rounded-lg py-2 px-4"
      />
      <button className="rounded-lg px-4 py-2 text-white bg-blue-600 hover:bg-blue-600/60 cursor-pointer">
        Save
      </button>
    </form>
  );
}
