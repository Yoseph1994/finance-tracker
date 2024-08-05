import { number, string, z } from "zod";

export const transactionSchema = z.object({
  amount: number()
    .refine((value) => value !== undefined && value !== null, {
      message: "Amount is required",
    })
    .transform(Number),
  text: z.string().min(5, "Minimum of five characters"),
});

// infer the type here
export type Transaction = z.infer<typeof transactionSchema>;
