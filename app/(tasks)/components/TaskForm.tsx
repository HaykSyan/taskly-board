"use client";
import { useTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Option, Select } from "@/app/shared/components/ui/Select";
import { Button, ErrorMessage, Input } from "@/app/shared/components/ui";

import { useTaskStore } from "../store/useTaskStore";

import { createTask } from "../actions";
import { Task, TaskFormValues, TaskSchema } from "../schemas/taskSchema";

export default function TaskForm() {
  const [isPending, startTransition] = useTransition();
  const { addOptimistic, replaceTask } = useTaskStore();

  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(TaskSchema),
    defaultValues: {
      title: "",
      description: "",
      priority: "medium",
      completed: false,
    },
  });

  const onSubmit: SubmitHandler<TaskFormValues> = (data) => {
    const tempId = `temp-${crypto.randomUUID()}`;
    const optimisticTask: Task = {
      ...data,
      id: tempId,
      status: "creating",
    };

    // Immediately show the new task
    addOptimistic(optimisticTask);
    reset();

    setTimeout(() => {
      startTransition(async () => {
        try {
          const created = await createTask(data);
          // Replace temporary ID with real one
          replaceTask(tempId, { ...created, status: "done" });
        } catch (e: unknown) {
          replaceTask(tempId, { ...optimisticTask, status: "failed" });
          console.error("Failed to add task", e);
        }
        window.dispatchEvent(new Event("task-added"));
      });
    }, 1000);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 p-4 bg-white dark:bg-neutral-800 rounded-2xl shadow-md"
    >
      <div>
        <label className="block text-sm font-medium mb-1">Title</label>
        <Input
          {...register("title")}
          type="text"
          placeholder="Enter task title..."
          className="w-full"
        />
        <ErrorMessage error={errors?.title?.message} />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <Input
          {...register("description")}
          type="text"
          placeholder="Optional short description"
          className="w-full"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Priority</label>
        <Select
          {...register("priority")}
          className="w-full"
          defaultValue="medium"
        >
          <Option value="low">Low</Option>
          <Option value="medium">Medium</Option>
          <Option value="high">High</Option>
        </Select>
      </div>
      <Button className="text-white bg-blue-600 hover:bg-blue-600/60 w-full">
        {isPending ? "Adding..." : "Add Task"}
      </Button>
    </form>
  );
}
