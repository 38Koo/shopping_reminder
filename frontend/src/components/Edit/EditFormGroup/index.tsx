import { Box, Button, HStack } from "@yamada-ui/react";
import { CommonFormItem } from "../../Common/CommonFormItem";

export const EditFormGroup = () => {
  return (
    <Box width="50%" padding="10px" height="100%">
      <Box
        border="solid 1px green"
        height="100%"
        borderRadius="36px"
        padding="30px"
      >
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
        <HStack justifyContent="end" pr="30px">
          <Box position="relative" width="auto">
            <Button bg="lime" fontWeight="bold" width="64px">
              Add
            </Button>
          </Box>
        </HStack>
      </Box>
    </Box>
  );
};
