import { z } from "zod";

export type EditItemFormType = z.infer<typeof editItemFormSchema>;

export const editItemFormSchema = z.object({
  itemName: z.string(),
  memo: z.string().optional(),
});
