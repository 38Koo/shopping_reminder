import { z } from "zod";

export type EditItemFormType = z.infer<typeof editItemFormSchema>;

export const editItemFormSchema = z.object({
  itemName: z.string().min(1, { message: "品名を入力してください。" }),
  memo: z
    .string()
    .max(200, { message: "備考は200文字以内で入力してください。" })
    .optional(),
});
