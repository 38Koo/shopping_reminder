import { Accordion, AccordionItem, Box, Button, Stack } from "@yamada-ui/react";
import { Form, FormProvider, useFieldArray, useForm } from "react-hook-form";
import { ReportCard } from "../ReportCard";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ReportFormType,
  reportFormSchemaArray,
} from "../../types/ReportFormtypes";

type ReportFormGroupProps = {
  data: any[];
  token: string | null;
};

export const ReportFormGroup = ({ data, token }: ReportFormGroupProps) => {
  const formMethods = useForm<ReportFormType>({
    defaultValues: {
      report: data
        ? data.map((item) => {
            return {
              PurchaseAmount: undefined,
              PurchaseDate: undefined,
              itemID: item.ID,
            };
          })
        : [],
    },
    mode: "onSubmit",
    resolver: zodResolver(reportFormSchemaArray),
  });

  const { fields } = useFieldArray({
    control: formMethods.control,
    name: "report",
    rules: { minLength: 1 },
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Box position="relative" height="80vh">
      <FormProvider {...formMethods}>
        <Form
          control={formMethods.control}
          onSubmit={onSubmit}
          method="post"
          action={`http://localhost:8989/api/report/submit`}
          headers={{
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          }}
        >
          <Accordion isMultiple>
            {fields.map((field, index) => (
              <AccordionItem label={data[index].itemName} minW="800px">
                <ReportCard
                  mapIndex={index}
                  key={field.id}
                  data={data[index]}
                />
              </AccordionItem>
            ))}
            {fields.map((field, index) => (
              <AccordionItem label={data[index].itemName} minW="800px">
                <ReportCard
                  mapIndex={index}
                  key={field.id}
                  data={data[index]}
                />
              </AccordionItem>
            ))}
          </Accordion>
          <Box textAlign="right">
            <Button type="submit" bg="orange">
              Register
            </Button>
          </Box>
        </Form>
      </FormProvider>
    </Box>
  );
};
