import { z } from "zod";

export type EditLogsFormSchemaArgs = {
  previousLogDate: Date;
  nextLogDate: Date;
};

export type EditLogFormType = z.infer<ReturnType<typeof editLogsFormSchema>>;

export const editLogsFormSchema = ({
  previousLogDate,
  nextLogDate,
}: EditLogsFormSchemaArgs) =>
  z.object({
    ID: z.number(),
    purchaseDate: z.date().superRefine((selectDate, ctx) => {
      if (
        !!previousLogDate &&
        selectDate.getTime() <= previousLogDate.getTime()
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `購入日は${previousLogDate}より後にしてください。`,
          fatal: true,
        });
      }

      if (!!nextLogDate && selectDate.getTime() >= nextLogDate.getTime()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `購入日は${nextLogDate}より前にしてください。`,
          fatal: true,
        });
      }
    }),
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
