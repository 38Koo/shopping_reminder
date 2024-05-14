import { Box, Button, Stack } from "@yamada-ui/react";
import { Form, useFieldArray, useForm } from "react-hook-form";
import { ReportCard } from "../ReportCard";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ReportFormType,
  reportFormSchemaArray,
} from "../types/ReportFormtypes";

export const ReportFormGroup = () => {
  const {
    control,
    register,
    formState: { errors },
  } = useForm<ReportFormType>({
    defaultValues: {
      report: [
        { PurchaseQuantity: 1, PurchaseDate: new Date() },
        { PurchaseQuantity: 1, PurchaseDate: new Date() },
      ],
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
            {fields.map((item, index) => (
              <ReportCard
                mapIndex={index}
                key={item.id}
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
