import { parseNumber } from "@/helpers/utils";
import { z } from "zod"

export const createProductFormSchema = z.object({
  name: z.string()
    .nonempty("Nome é obrigatório"),
  description: z.string()
    .nonempty("Descrição é obrigatória"),
  price: z.preprocess(parseNumber, z.number()
    .nonnegative("Valor não pode ser negativo")
    .min(0.001, "Preço é obrigatório")
  ),
  stock: z.preprocess(parseNumber, z.number()
    .nonnegative("Estoque não pode ser negativo")
    .min(0.1, "Estoque é obrigatório")
  ),
});

export type productFormData = z.infer<typeof createProductFormSchema>;
