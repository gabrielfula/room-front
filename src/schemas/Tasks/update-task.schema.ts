import { z } from "zod";

export const updateTaskFormSchema = z.object({
  name: z.string().transform((val) => val === "" ? undefined : val),
  description: z.string().transform((val) => val === "" ? undefined : val),
}).refine((data) => Object.keys(data).some(key => data[key as keyof typeof data] !== undefined), {
  message: "Pelo menos um campo deve ser preenchido",
});

export type updateTaskFormData = z.infer<typeof updateTaskFormSchema>;
