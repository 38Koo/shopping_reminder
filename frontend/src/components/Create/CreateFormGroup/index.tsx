import { Box, Button, HStack, Stack } from "@yamada-ui/react";
import { CommonFormItem } from "../../Common/CommonFormItem";

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
          <CommonFormItem title="品名">
            <Box></Box>
          </CommonFormItem>
          <CommonFormItem title="在庫数">
            <Box></Box>
          </CommonFormItem>
          <CommonFormItem title="購入日">
            <Box></Box>
          </CommonFormItem>
          <CommonFormItem title="次回購入日">
            <Box></Box>
          </CommonFormItem>
          <CommonFormItem title="備考">
            <Box></Box>
          </CommonFormItem>
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
