import { z } from "zod";

export type AddFromType = z.infer<typeof addFormSchema>;

export const addFormSchema = z.object({
  itemName: z.string().min(1, { message: "品名を入力してください。" }),
  stockCount: z.preprocess((v) => {
    if (v === "") return;
    return Number(v);
  }, z.number({ message: "数値を入力してください。" })),
  price: z.preprocess((v) => {
    if (v === "") return null;
    return Number(v);
  }, z.union([z.number(), z.null()])),
  purchaseDate: z.date().optional(),
  memo: z
    .string()
    .max(200, { message: "備考は200文字以内で入力してください。" })
    .optional(),
});
