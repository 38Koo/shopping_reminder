import { z } from "zod";

export type ReportFormType = z.infer<typeof reportFormSchemaArray>;

const reportFormSchema = z
  .array(
    z.object({
      PurchaseAmount: z
        .preprocess((v) => Number(v), z.number({ message: "入力が不正です。" }))
        .optional(),
      Price: z
        .preprocess((v) => Number(v), z.number({ message: "入力が不正です。" }))
        .optional(),
      PurchaseDate: z.date().optional(),
      itemID: z.number(),
    })
  )
  .refine((data) => {
    const validItems = data.filter(
      (item) => item.PurchaseAmount && item.PurchaseDate
    );
    return validItems.length > 0;
  })
  .transform((data) =>
    data.filter((item) => {
      return item.PurchaseAmount && item.PurchaseDate;
    })
  );

export const reportFormSchemaArray = z.object({
  report: reportFormSchema,
});
