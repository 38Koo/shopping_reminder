import { z } from "zod";

export type EditLogsFormSchemaArgs = {
  previousLogDate: Date;
  nextLogDate: Date;
};

export type EditLogFormType = z.infer<ReturnType<typeof editLogsFormSchema>>;

export const editLogsFormSchema = () =>
  z.object({
    ID: z.number(),
    purchaseDate: z.date().optional(),
    Price: z.preprocess(
      (v) => Number(v),
      z
        .number({
          message: "入力が不正です。",
        })
        .min(0)
    ),
    Amount: z.preprocess(
      (v) => Number(v),
      z
        .number({
          message: "入力が不正です。",
        })
        .min(1)
    ),
  });
