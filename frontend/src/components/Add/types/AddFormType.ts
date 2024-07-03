import { z } from "zod";

export type AddFromType = z.infer<typeof addFormSchema>;

export const addFormSchema = z.object({
  itemName: z.string().min(1, { message: "品名を入力してください。" }),
  stockCount: z.preprocess(
    (v) => Number(v),
    z
      .number({
        message: "数値を入力してください。",
      })
      .min(0)
  ),
  price: z.preprocess(
    (v) => Number(v),
    z
      .number({
        message: "数値を入力してください。",
      })
      .min(0)
  ),
  purchaseDate: z.date({ message: "購入日を入力してください。" }),
  memo: z
    .string()
    .max(200, { message: "備考は200文字以内で入力してください。" }),
});
