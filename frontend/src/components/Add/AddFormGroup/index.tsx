import {
  Button,
  Divider,
  FormControl,
  Input,
  Label,
  Stack,
  Textarea,
} from "@yamada-ui/react";
import { useForm } from "react-hook-form";
import { DatePicker } from "@yamada-ui/calendar";

export const AddFormGroup = () => {
  const { register, watch } = useForm();

  return (
    <Stack
      as="form"
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
        <Input placeholder="シャンプー" />
      </FormControl>
      <Divider pt="5" />
      <FormControl isRequired>
        <Label fontWeight="bold" fontSize="20px">
          在庫数
        </Label>
        <Input placeholder="3個" />
      </FormControl>
      <Divider pt="5" />
      <FormControl isRequired label="購入日">
        <Label fontWeight="bold" fontSize="20px">
          購入日
        </Label>
        <DatePicker placeholder="pick a date" width="200px" />
      </FormControl>
      <Divider pt="5" />
      <FormControl isRequired>
        <Label fontWeight="bold" fontSize="20px">
          備考
        </Label>
        <Textarea placeholder="備考を入力してください" />
      </FormControl>
      <Divider pt="5" />
      <Button type="submit" bg="lime" fontWeight="bold" width="64px">
        Submit
      </Button>
    </Stack>
  );
};
