import {
  Button,
  Divider,
  ErrorMessage,
  FormControl,
  Input,
  Label,
  Stack,
  Textarea,
} from "@yamada-ui/react";
import { Controller, Form, useForm } from "react-hook-form";
import { DatePicker } from "@yamada-ui/calendar";
import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddFromType, addFormSchema } from "./types/AddFormType";

export const AddFormGroup = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useForm<AddFromType>({
    resolver: zodResolver(addFormSchema),
  });
  const [token, setToken] = useState<string | null>(null);

  const { getToken } = useAuth();

  useEffect(() => {
    // FIXME: tokenをreq時に生成するようにする
    const fetchToken = async () => {
      const fetchedToken = await getToken();
      setToken(fetchedToken);
    };

    fetchToken();
  }, [getToken]);

  return (
    <Form
      action={"http://localhost:8989/api/add/item"}
      method="post"
      headers={{
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      }}
      encType="application/json"
      onSubmit={(data) => {
        console.log(data);
      }}
      control={control}
    >
      <Stack
        minW="768px"
        width="auto"
        padding="3rem"
        border="solid 1px #e5e7eb"
        borderRadius="8px"
        boxShadow="0 0 10px 0 rgba(0, 0, 0, 0.1)"
      >
        <FormControl isInvalid={!!errors.itemName} isRequired>
          <Label fontWeight="bold" fontSize="20px">
            品名
          </Label>
          <Input placeholder="シャンプー" {...register("itemName")} />
          <ErrorMessage>
            {errors.itemName && errors.itemName.message}
          </ErrorMessage>
        </FormControl>
        <Divider pt="5" />
        <FormControl isInvalid={!!errors.stockCount} isRequired>
          <Label fontWeight="bold" fontSize="20px">
            在庫数
          </Label>
          <Input
            type="number"
            placeholder="数値を入力してください"
            {...register("stockCount")}
          />
          <ErrorMessage>
            {errors.stockCount && errors.stockCount.message}
          </ErrorMessage>
        </FormControl>
        <Divider pt="5" />
        <FormControl isInvalid={!!errors.stockCount}>
          <Label fontWeight="bold" fontSize="20px">
            価格
          </Label>
          <Input
            type="number"
            placeholder="複数購入した場合は、合計金額を入力してください"
            {...register("price")}
          />
          <ErrorMessage>
            {errors.stockCount && errors.stockCount.message}
          </ErrorMessage>
        </FormControl>
        <Divider pt="5" />
        <FormControl isInvalid={!!errors.purchaseDate} label="購入日">
          <Label fontWeight="bold" fontSize="20px">
            購入日
          </Label>
          <Controller
            name="purchaseDate"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <DatePicker
                placeholder="pick a date"
                width="200px"
                onChange={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
          />
          <ErrorMessage>
            {errors.purchaseDate && errors.purchaseDate.message}
          </ErrorMessage>
        </FormControl>
        <Divider pt="5" />
        <FormControl isInvalid={!!errors.purchaseDate} label="購入日">
          <Label fontWeight="bold" fontSize="20px">
            次回購入日
          </Label>
          <Controller
            name="NextPurchaseDate"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <DatePicker
                placeholder="pick a date"
                width="200px"
                onChange={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
          />
          <ErrorMessage>
            {errors.purchaseDate && errors.purchaseDate.message}
          </ErrorMessage>
        </FormControl>
        <Divider pt="5" />
        <FormControl isInvalid={!!errors.memo}>
          <Label fontWeight="bold" fontSize="20px">
            備考
          </Label>
          <Textarea
            placeholder="備考を入力してください"
            {...register("memo")}
          />
          <ErrorMessage>{errors.memo && errors.memo.message}</ErrorMessage>
        </FormControl>
        <Button type="submit" bg="lime" fontWeight="bold" width="64px">
          Submit
        </Button>
      </Stack>
    </Form>
  );
};
