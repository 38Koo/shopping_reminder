import { Box, Button, Stack } from "@yamada-ui/react";
import { Form, useFieldArray, useForm } from "react-hook-form";
import { ReportCard } from "../ReportCard";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ReportFormType,
  reportFormSchemaArray,
} from "../types/ReportFormtypes";

type ReportFormGroupProps = {
  data: any[];
};

export const ReportFormGroup = ({ data }: ReportFormGroupProps) => {
  const {
    control,
    register,
    formState: { errors },
  } = useForm<ReportFormType>({
    defaultValues: {
      report: data
        ? data.map(() => {
            return {
              PurchaseQuantity: undefined,
              PurchaseDate: undefined,
            };
          })
        : [],
    },
    mode: "onBlur",
    resolver: zodResolver(reportFormSchemaArray),
  });
  const { fields } = useFieldArray({
    control,
    name: "report",
  });

  return (
    <Box position="relative" height="80vh">
      <Form
        control={control}
        onSubmit={(data) => console.log(data)}
        action={`http://localhost:8989`}
        method="post"
      >
        <Stack gap="30px">
          <Stack>
            {fields.map((field, index) => (
              <ReportCard
                mapIndex={index}
                key={field.id}
                data={data[index]}
                {...{ control, register, errors }}
              />
            ))}
          </Stack>
          <Box textAlign="right">
            <Button type="submit" bg="orange">
              Register
            </Button>
          </Box>
        </Stack>
      </Form>
    </Box>
  );
};
