import { z } from "zod";

export type ReportFormType = z.infer<typeof reportFormSchemaArray>;

const reportFormSchema = z
  .array(
    z.object({
      itemID: z.number(),
      PurchaseAmount: z.preprocess(
        (v) => Number(v),
        z.number({ message: "数値を入力してください。" })
      ),
      Price: z.preprocess(
        (v) => Number(v),
        z.number({ message: "数値を入力してください。" })
      ),
      PurchaseDate: z.date().optional(),
    })
  )
  .refine(
    (data) => {
      const validItems = data.filter(
        (item) => item.PurchaseAmount && item.PurchaseDate
      );
      return validItems.length > 0;
    },
    { message: "いずれかのitemの項目を入力してください。" }
  )
  .transform((data) =>
    data.filter((item) => {
      return item.PurchaseAmount && item.PurchaseDate;
    })
  );

export const reportFormSchemaArray = z.object({
  report: reportFormSchema,
});
