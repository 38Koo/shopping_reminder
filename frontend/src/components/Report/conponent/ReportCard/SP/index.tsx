import { Controller, useFormContext } from "react-hook-form";
import { ReportFormType } from "../../../types/ReportFormtypes";
import {
  Box,
  ErrorMessage,
  FormControl,
  HStack,
  Input,
  Label,
  VStack,
} from "@yamada-ui/react";
import { DatePicker } from "@yamada-ui/calendar";

type ReportCardForSPProps = {
  mapIndex: number;
};

export const ReportCardForSP = ({ mapIndex }: ReportCardForSPProps) => {
  const formMethods = useFormContext<ReportFormType>();

  return (
    <Box
      width="auto"
      padding="6"
      border="solid 1px #e5e7eb"
      borderRadius="8px"
      boxShadow="0 0 10px 0 rgba(0, 0, 0, 0.1)"
      gap={20}
    >
      <VStack w="100%" justifyContent="space-evenly">
        <FormControl>
          <HStack gap="1" align={"end"}>
            <Label width="60px" mr={0}>
              購入数:
            </Label>
            <Controller
              name={`report.${mapIndex}.PurchaseAmount`}
              defaultValue={0}
              control={formMethods.control}
              render={({ field }) => (
                <Input type="number" width="60px" {...field} />
              )}
            />
          </HStack>
          <ErrorMessage>
            {formMethods.formState.errors.report?.[mapIndex]?.PurchaseAmount &&
              formMethods.formState.errors.report?.[mapIndex]?.PurchaseAmount
                ?.message}
          </ErrorMessage>
        </FormControl>
        <FormControl>
          <HStack gap="1" align={"end"}>
            <Label width="60px" mr={0}>
              価格:
            </Label>
            <Controller
              name={`report.${mapIndex}.Price`}
              defaultValue={0}
              control={formMethods.control}
              render={({ field }) => (
                <Input type="number" width="100px" {...field} />
              )}
            />
          </HStack>
          <ErrorMessage>
            {formMethods.formState.errors.report?.[mapIndex]?.PurchaseAmount &&
              formMethods.formState.errors.report?.[mapIndex]?.PurchaseAmount
                ?.message}
          </ErrorMessage>
        </FormControl>
        <FormControl>
          <HStack gap="1" align={"end"}>
            <Label width="60px" mr={0}>
              購入日:
            </Label>
            <Controller
              name={`report.${mapIndex}.PurchaseDate`}
              control={formMethods.control}
              render={({ field }) => <DatePicker width="200px" {...field} />}
            />
          </HStack>
          <ErrorMessage>
            {formMethods.formState.errors.report?.[mapIndex]?.PurchaseDate &&
              formMethods.formState.errors.report?.[mapIndex]?.PurchaseDate
                ?.message}
          </ErrorMessage>
        </FormControl>
      </VStack>
    </Box>
  );
};
