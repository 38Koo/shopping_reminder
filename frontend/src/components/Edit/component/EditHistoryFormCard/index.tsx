import { DatePicker } from "@yamada-ui/calendar";
import { Box, Button, HStack, Input, Text, VStack } from "@yamada-ui/react";

type EditHistoryFormCardProps = {
  data: any; //TODO: 適切な型に修正する
};

export const EditHistoryFormCard = ({}: EditHistoryFormCardProps) => {
  return (
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
        <Text>1</Text>
      </Box>
      <HStack>
        <VStack>
          <HStack>
            <Text width="60px">購入日 :</Text>
            <DatePicker width="150px" />
          </HStack>
          <HStack>
            <Text width="60px">価格 :</Text>
            <Input type="number" width="200px" />
          </HStack>
          <HStack>
            <HStack>
              <Text width="60px">数量 :</Text>
              <Input type="number" width="200px" />
            </HStack>
          </HStack>
        </VStack>
      </HStack>
      <HStack justifyContent="flex-end" width="100px">
        <Button type="submit" bg="lime" fontWeight="bold" width="64px">
          Submit
        </Button>
      </HStack>
    </HStack>
  );
};
