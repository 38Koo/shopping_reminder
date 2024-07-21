import { DatePicker } from "@yamada-ui/calendar";
import {
  Box,
  Button,
  ErrorMessage,
  FormControl,
  HStack,
  Input,
  Label,
  VStack,
  useDisclosure,
} from "@yamada-ui/react";
import { Controller, Form, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { Icon } from "@yamada-ui/fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import {
  EditLogFormType,
  editLogsFormSchema,
} from "../../../types/EditLogsFormType";
import { DeleteLogModal } from "../../DeleteLogModal";

type EditHistoryFormCardForPCProps = {
  data: EditLogFormType;
  token: string | null;
};

export const EditHistoryFormCardForPC = ({
  data,
  token,
}: EditHistoryFormCardForPCProps) => {
  const {
    control,
    formState: { errors },
  } = useForm<EditLogFormType>({
    resolver: zodResolver(editLogsFormSchema()),
    defaultValues: {
      ID: data.ID,
      purchaseDate: new Date(data.purchaseDate ?? ""),
      Price: data.Price,
      Amount: data.Amount,
    },
  });
  const router = useRouter();
  const { itemID } = router.query;

  const { isOpen, onOpen, onClose } = useDisclosure();

  if (!itemID || Array.isArray(itemID)) {
    return null;
  }

  return (
    <Form
      control={control}
      action={`${process.env.NEXT_PUBLIC_API_SERVER_DOMAIN}/api/edit/log`}
      method="post"
      headers={{
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      }}
      encType="application/json"
      onSubmit={(data) => {
        console.log(data);
      }}
      onSuccess={() => alert("更新しました")}
      onError={() => alert("エラーが発生しました")}
    >
      <HStack
        minW={{ base: "400px", md: "300px" }}
        padding={{ base: "3rem", md: "1rem" }}
        border="solid 1px #e5e7eb"
        borderRadius="8px"
        boxShadow="0 0 10px 0 rgba(0, 0, 0, 0.1)"
        align="end"
        position="relative"
        gap={10}
      >
        <Box position="absolute" top={4} right={6}>
          <Icon icon={faTrashCan} size="xl" color="gray" onClick={onOpen} />
          <DeleteLogModal
            isOpen={isOpen}
            onClose={onClose}
            token={token}
            logID={data.ID}
          />
        </Box>
        <HStack>
          <VStack>
            <FormControl isInvalid={!!errors.purchaseDate} isRequired>
              <HStack alignItems="end" gap={{ base: 4, md: 1 }}>
                <Label width="70px">購入日 :</Label>
                <Controller
                  name="purchaseDate"
                  control={control}
                  render={({ field }) => {
                    return (
                      <DatePicker
                        width="150px"
                        {...field}
                        isClearable
                        today
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
              <HStack alignItems="end" gap={{ base: 4, md: 1 }}>
                <Label width="70px">価格 :</Label>
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
              <HStack alignItems="end" gap={{ base: 4, md: 1 }}>
                <Label width="70px">数量 :</Label>
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
        <Button type="submit" bg="lime" fontWeight="bold" width="64px">
          Submit
        </Button>
      </HStack>
    </Form>
  );
};
