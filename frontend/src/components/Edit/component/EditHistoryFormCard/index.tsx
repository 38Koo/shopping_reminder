import { DatePicker } from "@yamada-ui/calendar";
import {
  Box,
  Button,
  ErrorMessage,
  FormControl,
  HStack,
  Input,
  Text,
  VStack,
} from "@yamada-ui/react";
import { Controller, Form, useForm } from "react-hook-form";
import {
  EditLogFormType,
  editLogsFormSchema,
} from "../../types/EditLogsFormType";
import { zodResolver } from "@hookform/resolvers/zod";

type EditHistoryFormCardProps = {
  data: EditLogFormType & {
    previousLogDate: Date;
    nextLogDate: Date;
  };
  token: string | null;
  itemID: number;
};

export const EditHistoryFormCard = ({
  data,
  token,
  itemID,
}: EditHistoryFormCardProps) => {
  const {
    control,
    register,
    formState: { errors },
    resetField,
  } = useForm<EditLogFormType>({
    resolver: zodResolver(
      editLogsFormSchema({
        previousLogDate: data.previousLogDate,
        nextLogDate: data.nextLogDate,
      })
    ),
    defaultValues: {
      PurchaseCount: data.PurchaseCount,
      purchaseDate: new Date(data.purchaseDate),
      Price: data.Price,
      Amount: data.Amount,
    },
  });

  return (
    <Form
      control={control}
      action={`http://localhost:8989/api/edit/log/${itemID}`}
      method="post"
      headers={{
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      }}
      encType="application/json"
      onSubmit={(data) => {
        console.log(data);
      }}
    >
      <HStack
        minW="400px"
        width="auto"
        padding="3rem"
        border="solid 1px #e5e7eb"
        borderRadius="8px"
        boxShadow="0 0 10px 0 rgba(0, 0, 0, 0.1)"
        align="end"
        position="relative"
      >
        <Box position="absolute" top={4} left={6}>
          <FormControl>
            <Text {...register("PurchaseCount")}>{data.PurchaseCount}</Text>
          </FormControl>
        </Box>
        <HStack>
          <VStack>
            <FormControl isInvalid={!!errors.purchaseDate} isRequired>
              <HStack>
                <Text width="60px">購入日 :</Text>
                <Controller
                  name="purchaseDate"
                  control={control}
                  render={({ field }) => {
                    return (
                      <DatePicker
                        width="150px"
                        {...field}
                        isClearable
                        // FIXME: クリアボタン押下時にリセットされない
                        // onClear={() => {
                        //   console.log(1);

                        //   return resetField("purchaseDate", {
                        //     defaultValue: new Date("2024-01-01"),
                        //   });
                        // }}
                      />
                    );
                  }}
                />
              </HStack>
              <ErrorMessage>
                {errors.purchaseDate && errors.purchaseDate.message}
              </ErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.Price} isRequired>
              <HStack>
                <Text width="60px">価格 :</Text>
                <Controller
                  name="Price"
                  control={control}
                  render={({ field }) => (
                    <Input type="number" width="200px" {...field} />
                  )}
                />
              </HStack>
              <ErrorMessage>
                {errors.Price && errors.Price.message}
              </ErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.Amount} isRequired>
              <HStack>
                <Text width="60px">数量 :</Text>
                <Controller
                  name="Amount"
                  control={control}
                  render={({ field }) => (
                    <Input type="number" width="200px" {...field} />
                  )}
                />
                <ErrorMessage>
                  {errors.Amount && errors.Amount.message}
                </ErrorMessage>
              </HStack>
              <ErrorMessage>
                {errors.Amount && errors.Amount.message}
              </ErrorMessage>
            </FormControl>
          </VStack>
        </HStack>
        <HStack justifyContent="flex-end" width="100px">
          <Button type="submit" bg="lime" fontWeight="bold" width="64px">
            Submit
          </Button>
        </HStack>
      </HStack>
    </Form>
  );
};
