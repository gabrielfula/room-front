import { z } from "zod"

export const loginFormSchema = z.object({
  email: z.string()
    .email("Formato de E-mail Inválido")
    .nonempty("E-mail é obrigatório"),
  password: z.string()
    .nonempty("Senha é obrigatório"),
})

export type loginFormData = z.infer<typeof loginFormSchema>