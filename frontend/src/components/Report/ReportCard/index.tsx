import { DatePicker } from "@yamada-ui/calendar";
import {
  ErrorMessage,
  FormControl,
  HStack,
  Input,
  Label,
} from "@yamada-ui/react";
import {
  Control,
  Controller,
  FieldErrors,
  UseFormRegister,
} from "react-hook-form";
import { ReportFormType } from "../types/ReportFormtypes";

type ReportCardProps = {
  register: UseFormRegister<ReportFormType>;
  control: Control<ReportFormType>;
  errors: FieldErrors<ReportFormType>;
  mapIndex: number;
  data: {
    PurchaseQuantity?: number | undefined;
    PurchaseDate?: Date | undefined;
  };
};

export const ReportCard = ({
  register,
  control,
  errors,
  mapIndex,
  data,
}: ReportCardProps) => {
  return (
    <HStack
      minW="800px"
      width="auto"
      padding="6"
      border="solid 1px #e5e7eb"
      borderRadius="8px"
      boxShadow="0 0 10px 0 rgba(0, 0, 0, 0.1)"
      gap={20}
    >
      <Label fontWeight="bold">{data.itemName}</Label>
      <HStack gap="10">
        <FormControl isRequired>
          <HStack gap="0" align={"end"}>
            <Label width="80px">購入数:</Label>
            <Input
              type="number"
              width="60px"
              {...register(`report.${mapIndex}.PurchaseQuantity` as const, {
                required: true,
                valueAsNumber: true,
              })}
            />
          </HStack>
          <ErrorMessage>
            {errors.report?.[mapIndex]?.PurchaseQuantity &&
              errors.report?.[mapIndex]?.PurchaseQuantity?.message}
          </ErrorMessage>
        </FormControl>
        <FormControl isRequired>
          <HStack gap="0" align={"end"}>
            <Label width="80px">購入日:</Label>
            <Controller
              name={`report.${mapIndex}.PurchaseDate`}
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <DatePicker
                  width="200px"
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                />
              )}
            />
          </HStack>
          <ErrorMessage>
            {errors.report?.[mapIndex]?.PurchaseDate &&
              errors.report?.[mapIndex]?.PurchaseDate?.message}
          </ErrorMessage>
        </FormControl>
      </HStack>
    </HStack>
  );
};
