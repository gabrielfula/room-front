import { z } from "zod"

export const createTasksFormSchema = z.object({
  name: z.string()
    .nonempty("Nome é obrigatório"),
  description: z.string()
    .nonempty("Descrição é obrigatória"),
});

export type taskFormData = z.infer<typeof createTasksFormSchema>;
