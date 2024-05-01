import {
  Button,
  Divider,
  FormControl,
  Input,
  Label,
  Stack,
  Textarea,
} from "@yamada-ui/react";
import { Controller, Form, useForm } from "react-hook-form";
import { DatePicker } from "@yamada-ui/calendar";
import { AddFormType } from "./types/addFormType";
import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";

export const AddFormGroup = () => {
  const { register, control, watch, setValue } = useForm<AddFormType>();
  const [token, setToken] = useState<string | null>("");

  const { getToken } = useAuth();

  useEffect(() => {
    const fetchToken = async () => {
      const fetchedToken = await getToken();
      setToken(fetchedToken);
    };

    fetchToken();
  }, [getToken]);

  return (
    <Form
      action={"http://localhost:8989/api/add/item"}
      headers={{ Authorization: `Bearer ${token}`, Credentials: "include" }}
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
        <FormControl isRequired errorMessage="1">
          <Label fontWeight="bold" fontSize="20px">
            品名
          </Label>
          <Input placeholder="シャンプー" {...register("itemName")} />
        </FormControl>
        <Divider pt="5" />
        <FormControl isRequired>
          <Label fontWeight="bold" fontSize="20px">
            在庫数
          </Label>
          <Input
            type="number"
            placeholder="数値を入力してください"
            {...register("stockCount")}
          />
        </FormControl>
        <Divider pt="5" />
        <FormControl isRequired label="購入日">
          <Label fontWeight="bold" fontSize="20px">
            購入日
          </Label>
          <Controller
            name="purchaseDate"
            control={control}
            render={({ field }) => (
              <DatePicker
                placeholder="pick a date"
                width="200px"
                onChange={(date) => {
                  if (!date) {
                    setValue("purchaseDate", null);
                    return;
                  }
                  setValue("purchaseDate", date);
                }}
              />
            )}
          />
        </FormControl>
        <Divider pt="5" />
        <FormControl>
          <Label fontWeight="bold" fontSize="20px">
            備考
          </Label>
          <Textarea
            placeholder="備考を入力してください"
            {...register("memo")}
          />
        </FormControl>
        <Divider pt="5" />
        <Button type="submit" bg="lime" fontWeight="bold" width="64px">
          Submit
        </Button>
      </Stack>
    </Form>
  );
};
