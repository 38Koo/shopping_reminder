import { z } from "zod";

export type AddFromType = z.infer<typeof addFormSchema>;

export const addFormSchema = z.object({
  itemName: z.string(),
  stockCount: z.number(),
  purchaseDate: z.date(),
  memo: z.string().optional(),
});
