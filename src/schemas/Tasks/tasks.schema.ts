import { z } from "zod"

export const createTasksFormSchema = z.object({
  title: z.string()
    .nonempty("Título é obrigatório"),
  description: z.string()
    .nonempty("Descrição é obrigatória"),
});

export type taskFormData = z.infer<typeof createTasksFormSchema>;
