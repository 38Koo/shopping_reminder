import {
  Button,
  Center,
  Divider,
  ErrorMessage,
  FormControl,
  HStack,
  Input,
  Label,
  Stack,
  Text,
  Textarea,
} from "@yamada-ui/react";
import { Form, useForm } from "react-hook-form";
import { EditFormType, editFormSchema } from "../../types/EditFormTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { Red_Hat_Display } from "next/font/google";

type EditFormGroupProps = {
  token: string | null;
  data: any; //TODO: 適切な型に修正する
};

export const EditFormGroup = ({ token, data }: EditFormGroupProps) => {
  const router = useRouter();
  const { itemID } = router.query;

  const {
    register,
    control,
    formState: { errors },
  } = useForm<EditFormType>({
    resolver: zodResolver(editFormSchema),
  });

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
        <FormControl isRequired>
          <Label fontWeight="bold" fontSize="20px">
            品名
          </Label>
          <Input defaultValue={data.itemName} {...register("itemName")} />
          <ErrorMessage>
            {errors.itemName && errors.itemName.message}
          </ErrorMessage>
        </FormControl>
        <Divider pt="5" />
        <Stack>
          <Label fontWeight="bold" fontSize="20px">
            在庫数
          </Label>
          <HStack align="end" justifyContent="center">
            <Text fontSize={"36px"} fontWeight="bold">
              {data.stockCount}
            </Text>
            <Text>個</Text>
          </HStack>
        </Stack>
        <Divider pt="5" />
        <Label fontWeight="bold" fontSize="20px">
          次回購入予定日まで
        </Label>
        <HStack align="end" justifyContent="center">
          <Text>あと</Text>
          <Text fontSize={"36px"} fontWeight="bold">
            {data.UntilNextTimeByDays}
          </Text>
          <Text>日</Text>
        </HStack>
        <Divider pt="5" />
        <HStack>
          <Stack width="50%">
            <Label fontWeight="bold" fontSize="20px">
              平均購入価格
            </Label>
            <HStack>
              <Input
                type="number"
                defaultValue={data.AveragePrice}
                width="100px"
                disabled
              />
              <Text>円</Text>
            </HStack>
          </Stack>
          <Center height="50px">
            <Divider pt="5" orientation="vertical" />
          </Center>
          <Stack width="50%">
            <Label fontWeight="bold" fontSize="20px">
              平均消費日数
            </Label>
            <HStack>
              <Input
                type="number"
                defaultValue={data.UsageDuration}
                width="100px"
                disabled
              />
              <Text>日</Text>
            </HStack>
          </Stack>
        </HStack>
        <Divider pt="5" />
        <FormControl>
          <Label fontWeight="bold" fontSize="20px">
            備考
          </Label>
          <Textarea
            defaultValue={data.Memo}
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
