import { Box, Button, HStack } from "@yamada-ui/react";
import { SignInButton, SignUpButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <Box
      display="flex"
      alignItems="center"
      height="100vh"
      width="full"
      justifyContent="center"
    >
      <Box
        border="solid 1px red"
        width="500px"
        height="500px"
        borderRadius="16px"
      >
        <HStack justifyContent="space-evenly" alignItems="center" height="100%">
          <SignUpButton mode="modal">
            <Button p="md" rounded="4" bg="primary" color="white">
              Sign Up
            </Button>
          </SignUpButton>

          <SignInButton mode="modal">
            <Button p="md" rounded="4" bg="primary" color="white">
              Sign In
            </Button>
          </SignInButton>
        </HStack>
      </Box>
    </Box>
  );
}
