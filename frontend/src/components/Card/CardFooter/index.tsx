import { Box, Button } from "@yamada-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";

export const CardFooter = () => {
  const router = useRouter();

  return (
    <Box position="fixed" bottom="0" left="0" height="10%" width="100%">
      <Box position="absolute" right="5rem" top="10px">
        <Button
          as="span"
          colorScheme="lime"
          color="black"
          onClick={() => router.push("/add")}
        >
          Add Item
        </Button>
      </Box>
    </Box>
  );
};
