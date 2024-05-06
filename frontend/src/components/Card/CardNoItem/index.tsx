import { Box, Button, Stack, Text } from "@yamada-ui/react";
import { useRouter } from "next/router";

export const CardNoItem = () => {
  const router = useRouter();
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      height="60vh"
      width="70%"
    >
      <Box fontSize={36}>
        <Text>There is No Items.</Text>
        <Text>Let's start planning your shopping!</Text>
      </Box>
      <Button
        as="span"
        colorScheme="lime"
        color="black"
        onClick={() => {
          router.push("/add");
        }}
      >
        Add Item
      </Button>
    </Stack>
  );
};
