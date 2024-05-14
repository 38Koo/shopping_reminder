import { z } from "zod";

export type ReportFormType = {
  report: z.infer<typeof reportFormSchema>[];
};

const reportFormSchema = z.object({
  PurchaseQuantity: z.preprocess(
    (v) => Number(v),
    z.number({ message: "入力が不正です。" })
  ),
  PurchaseDate: z.date().optional(),
});

export const reportFormSchemaArray = z.object({
  report: reportFormSchema.array(),
});
