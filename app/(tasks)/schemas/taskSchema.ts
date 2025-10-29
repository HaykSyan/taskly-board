import zod from "zod";

export const TaskSchema = zod.object({
  id: zod.string().optional(),
  title: zod
    .string()
    .trim()
    .min(3, { message: "Must be at least 3 characters" }),
  description: zod.string().max(200, "Description too long").optional(),
  // priority: zod.enum(["low", "medium", "high"]),
  // dueDate: zod.string().optional(),
  // completed: zod.boolean().default(false),
});

export type Task = zod.infer<typeof TaskSchema>;
