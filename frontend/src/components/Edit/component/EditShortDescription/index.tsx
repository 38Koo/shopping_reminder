import { Box, HStack, Stack, Text, VStack } from "@yamada-ui/react";

type EditShortDescriptionProps = {
  data: any; //TODO: 適切な型に修正する
};

export const EditShortDescription = ({ data }: EditShortDescriptionProps) => {
  return (
    <Box>
      <HStack align="end">
        <VStack width="50%">
          <Text fontWeight="bold" fontSize="2xl">
            シャンプー
          </Text>
          <HStack>
            <Text>平均購入価格</Text>
            <Text>400</Text>
            <Text>円</Text>
          </HStack>
          <HStack>
            <Text>平均消費期間</Text>
            <Text>20</Text>
            <Text>日</Text>
          </HStack>
        </VStack>
        <Stack>
          <Text>次回購入予定まで</Text>
          <HStack>
            <Text>あと</Text>
            <Text fontSize="2xl" fontWeight="bold">
              5
            </Text>
            <Text>日</Text>
          </HStack>
        </Stack>
      </HStack>
    </Box>
  );
};
