import { Box, Button } from "@yamada-ui/react";
import Link from "next/link";

export const CardFooter = () => {
  const userName = "38koo";

  return (
    <Box position="fixed" bottom="0" height="10%" width="full">
      <Box position="absolute" right="50px" top="10px">
        <Link href={`/create/${userName}/new`}>
          <Button as="span" colorScheme="lime" color="black">
            Add Item
          </Button>
        </Link>
      </Box>
    </Box>
  );
};
