import { z } from "zod";

export type AddFromType = z.infer<typeof addFormSchema>;

export const addFormSchema = z.object({
  itemName: z.string().min(5, { message: "入力が不正です。" }),
  stockCount: z.preprocess(
    (v) => Number(v),
    z.number({ message: "入力が不正です。" })
  ),
  price: z.preprocess(
    (v) => Number(v),
    z.number({ message: "入力が不正です。" })
  ),
  purchaseDate: z.date().optional(),
  NextPurchaseDate: z.date().optional(),
  memo: z.string().optional(),
});
