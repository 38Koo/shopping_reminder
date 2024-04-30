import { Box, Button } from "@yamada-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";

export const CardFooter = () => {
  const router = useRouter();

  return (
    <Box position="fixed" bottom="0" height="10%" width="full">
      <Box position="absolute" right="50px" top="10px">
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
