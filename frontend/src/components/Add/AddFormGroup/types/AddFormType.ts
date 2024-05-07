import { z } from "zod";

export type AddFromType = z.infer<typeof addFormSchema>;

export const addFormSchema = z.object({
  itemName: z.string().min(5, { message: "入力が不正です。" }),
  stockCount: z.string({ message: "入力が不正です。" }),
  purchaseDate: z.date().optional(),
  memo: z.string().optional(),
});
