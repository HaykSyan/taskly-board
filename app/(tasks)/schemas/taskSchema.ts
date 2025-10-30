import zod from "zod";

export const TaskSchema = zod.object({
  id: zod.string().optional(),
  title: zod
    .string()
    .trim()
    .min(3, { message: "Must be at least 3 characters" }),
  description: zod.string().max(200, "Description too long").optional(),
  priority: zod.enum(["low", "medium", "high"]),
  completed: zod.boolean().nullable().default(false),
});

export type TaskFormValues = zod.infer<typeof TaskSchema>;
export type Task = TaskFormValues & {
  status?: "creating" | "done" | "failed" | undefined;
};
