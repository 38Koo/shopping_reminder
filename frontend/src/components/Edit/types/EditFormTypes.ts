import { z } from "zod";

export type EditFormType = z.infer<typeof editFormSchema>;

export const editFormSchema = z.object({
  itemName: z.string(),
  stockCount: z.preprocess(
    (v) => Number(v),
    z.number({ message: "入力が不正です。" })
  ),
  purchaseDate: z.date().optional(),
  memo: z.string().optional(),
});
