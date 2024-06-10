import { z } from "zod";

export type ReportFormType = {
  report: z.infer<typeof reportFormSchema>[];
};

const reportFormSchema = z.object({
  PurchaseAmount: z
    .preprocess((v) => Number(v), z.number({ message: "入力が不正です。" }))
    .optional(),
  PurchaseDate: z.date().optional(),
  itemID: z.number(),
});

export const reportFormSchemaArray = z.object({
  report: reportFormSchema.array(),
});
