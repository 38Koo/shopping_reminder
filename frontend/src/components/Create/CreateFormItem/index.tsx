import { Box, HStack, Input, Stack, Text } from "@yamada-ui/react";

type CreateFormItemProps = {
  title: string;
  children: React.ReactNode;
};

export const CreateFormItem = ({ title, children }: CreateFormItemProps) => {
  return (
    <Box position="relative">
      <Stack height="100px" justifyContent="center">
        <HStack position="relative" width="100%">
          <HStack position="relative" left="20px" width="120px">
            <Text fontSize="24px" fontWeight="bold">
              {title}
            </Text>
          </HStack>
          <Box position="absolute" width="80%" right="0">
            <Input variant="flushed" width="100%" />
            {/* {children} */}
          </Box>
        </HStack>
      </Stack>
    </Box>
  );
};
