import { Box, HStack } from "@yamada-ui/layouts";
import { Logo } from "./Logo";
import { SignOutButton } from "@clerk/nextjs";
import { Button } from "@yamada-ui/react";
import { useRouter } from "next/router";

export const Header = () => {
  const router = useRouter();

  return (
    <Box
      height="8rem"
      width="full"
      position="sticky"
      zIndex={1000}
      top={0}
      bgColor={"white"}
      _before={{
        content: "''",
        position: "absolute",
        top: "calc(8rem - 3px)",
        left: "3rem",
        borderBottom: "solid 3px black",
        width: "calc(100% - 6rem)",
        borderWidth: "100%",
      }}
    >
      <HStack width="100%" height="calc(8rem - 3px)">
        <Box paddingLeft="30px">
          <Logo />
        </Box>
        <HStack
          width="300px"
          height="calc(8rem - 3px)"
          position="absolute"
          right="0px"
          justifyContent="space-between"
          paddingRight="5rem"
        >
          <Box>My page</Box>
          <Box>Setting</Box>
          <Box>Menu</Box>
          <Box>
            <SignOutButton>
              <Button
                p="md"
                rounded="4"
                bg="primary"
                color="white"
                onClick={() => router.push("/")}
              >
                Sign Out
              </Button>
            </SignOutButton>
          </Box>
        </HStack>
      </HStack>
    </Box>
  );
};
