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
import { EditFormType, editFormSchema } from "../types/EditFormTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { DatePicker } from "@yamada-ui/calendar";
import { useRouter } from "next/router";
import { getItem } from "../handlers/getItem";

export const EditFormGroup = () => {
  const router = useRouter();
  const { itemID } = router.query;

  if (!itemID || Array.isArray(itemID)) {
    return null;
  }

  const { data } = getItem(parseInt(itemID));

  const {
    register,
    control,
    formState: { errors },
  } = useForm<EditFormType>({
    resolver: zodResolver(editFormSchema),
  });

  const [token, setToken] = useState<string | null>(null);

  const { getToken } = useAuth();

  useEffect(() => {
    const fetchToken = async () => {
      const fetchedToken = await getToken();
      setToken(fetchedToken);
    };

    fetchToken();
  }, [getToken]);

  if (!data) {
    return null;
  }

  return (
    <Form
      action={`http://localhost:8989/api/edit/item/${itemID}`}
      method="post"
      headers={{
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      }}
      onSubmit={(data) => console.log(data)}
      control={control}
    >
      <Stack
        minW="600px"
        width="auto"
        padding="3rem"
        border="solid 1px #e5e7eb"
        borderRadius="8px"
        boxShadow="0 0 10px 0 rgba(0, 0, 0, 0.1)"
      >
        <FormControl isRequired errorMessage="1">
          <Label fontWeight="bold" fontSize="20px">
            品名
          </Label>
          <Input
            defaultValue={data[0].itemName}
            placeholder="シャンプー"
            {...register("itemName")}
          />
          <ErrorMessage>
            {errors.itemName && errors.itemName.message}
          </ErrorMessage>
        </FormControl>
        <Divider pt="5" />
        <FormControl isRequired>
          <Label fontWeight="bold" fontSize="20px">
            在庫数
          </Label>
          <Input
            type="number"
            defaultValue={data[0].stockCount}
            placeholder="数値を入力してください"
            {...register("stockCount")}
          />
          <ErrorMessage>
            {errors.stockCount && errors.stockCount.message}
          </ErrorMessage>
        </FormControl>
        <Divider pt="5" />
        <FormControl isRequired label="購入日">
          <Label fontWeight="bold" fontSize="20px">
            購入日
          </Label>
          <Controller
            name="purchaseDate"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <DatePicker
                defaultValue={data[0].purchaseDate} // TODO: これ動いてない
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
        <FormControl>
          <Label fontWeight="bold" fontSize="20px">
            備考
          </Label>
          <Textarea
            defaultValue={data[0].memo}
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
