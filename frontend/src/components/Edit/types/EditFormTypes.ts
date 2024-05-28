import { z } from "zod";

export type EditFormType = z.infer<typeof editFormSchema>;

export const editFormSchema = z.object({
  itemName: z.string(),
  memo: z.string().optional(),
});
