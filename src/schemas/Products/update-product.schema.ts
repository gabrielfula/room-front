import { parseNumber } from "@/helpers/utils";
import { z } from "zod";

export const updateProductFormSchema = z.object({
  name: z.string().transform((val) => val === "" ? undefined : val),
  description: z.string().transform((val) => val === "" ? undefined : val),
  price: z.preprocess(parseNumber, z.number()
    .nonnegative("Valor não pode ser negativo")
    .transform((val) => val === 0 ? undefined : val)
  ),
  stock: z.preprocess(parseNumber, z.number()
    .nonnegative("Estoque não pode ser negativo")
    .transform((val) => val === 0 ? undefined : val)
  ),
}).refine((data) => Object.keys(data).some(key => data[key as keyof typeof data] !== undefined), {
  message: "Pelo menos um campo deve ser preenchido",
});

export type updateProductFormData = z.infer<typeof updateProductFormSchema>;
