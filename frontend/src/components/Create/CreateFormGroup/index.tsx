import { Box, Button, HStack, Stack } from "@yamada-ui/react";
import { CreateFormItem } from "../CreateFormItem";

export const CreateFormGroup = () => {
  return (
    <HStack
      width="100vw"
      height="100vh"
      justifyContent="center"
      position="relative"
      top="-100"
    >
      <Stack
        width="800px"
        height="700px"
        border="solid 3px #A5C5E2"
        borderRadius="48px"
        bgColor="#A5C5E2"
      >
        <Box padding="30px">
          <CreateFormItem title="品名">
            <Box></Box>
          </CreateFormItem>
          <CreateFormItem title="在庫数">
            <Box></Box>
          </CreateFormItem>
          <CreateFormItem title="購入日">
            <Box></Box>
          </CreateFormItem>
          <CreateFormItem title="次回購入日">
            <Box></Box>
          </CreateFormItem>
          <CreateFormItem title="備考">
            <Box></Box>
          </CreateFormItem>
        </Box>
        <HStack justifyContent="end" pr="30px">
          <Box position="relative" width="auto">
            <Button bg="lime" fontWeight="bold" width="64px">
              Add
            </Button>
          </Box>
        </HStack>
      </Stack>
    </HStack>
  );
};
