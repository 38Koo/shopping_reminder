import { DatePicker } from "@yamada-ui/calendar";
import {
  ErrorMessage,
  FormControl,
  HStack,
  Input,
  Label,
} from "@yamada-ui/react";
import { Controller, useFormContext } from "react-hook-form";
import { ReportFormType } from "../../types/ReportFormtypes";

type ReportCardProps = {
  mapIndex: number;
  data: {
    PurchaseAmount?: number | undefined;
    PurchaseDate?: Date | undefined;
    itemName: string;
  };
};

export const ReportCard = ({ mapIndex, data }: ReportCardProps) => {
  const formMethods = useFormContext<ReportFormType>();

  return (
    <HStack
      width="auto"
      padding="6"
      border="solid 1px #e5e7eb"
      borderRadius="8px"
      boxShadow="0 0 10px 0 rgba(0, 0, 0, 0.1)"
      gap={20}
    >
      <HStack w="100%" justifyContent="space-evenly">
        <FormControl>
          <HStack gap="1" align={"end"}>
            <Label width="60px" mr={0}>
              購入数:
            </Label>
            <Controller
              name={`report.${mapIndex}.PurchaseAmount`}
              defaultValue={0}
              control={formMethods.control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  type="number"
                  width="60px"
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                />
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
              name={`report.${mapIndex}.PurchaseAmount`}
              defaultValue={0}
              control={formMethods.control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  type="number"
                  width="60px"
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                />
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
              render={({ field: { onChange, onBlur, value, ...rest } }) => (
                <DatePicker
                  width="200px"
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  {...rest}
                />
              )}
            />
          </HStack>
          <ErrorMessage>
            {formMethods.formState.errors.report?.[mapIndex]?.PurchaseDate &&
              formMethods.formState.errors.report?.[mapIndex]?.PurchaseDate
                ?.message}
          </ErrorMessage>
        </FormControl>
      </HStack>
    </HStack>
  );
};
