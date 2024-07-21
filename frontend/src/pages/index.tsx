import { Box, Button, HStack, Link, Text } from "@yamada-ui/react";
import { SignInButton, SignUpButton, useAuth } from "@clerk/nextjs";
import { Icon } from "@yamada-ui/fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  const { isSignedIn } = useAuth();

  return (
    <Box
      display="flex"
      alignItems="center"
      height="100vh"
      width="full"
      justifyContent="center"
    >
      <Box
        border="solid 5px orange"
        width="500px"
        height="500px"
        borderRadius="16px"
        position="relative"
      >
        <HStack justifyContent="space-evenly" alignItems="center" height="100%">
          <SignUpButton mode="modal">
            <Button
              p="md"
              rounded="4"
              bg="primary"
              color="white"
              onClick={
                isSignedIn
                  ? () => alert("すでにサインアップしています。")
                  : undefined
              }
            >
              Sign Up
            </Button>
          </SignUpButton>
          <SignInButton mode="modal">
            <Button
              p="md"
              rounded="4"
              bg="primary"
              color="white"
              onClick={
                isSignedIn
                  ? () => alert("すでにサインインしています。")
                  : undefined
              }
            >
              Sign In
            </Button>
          </SignInButton>
        </HStack>
        {isSignedIn && (
          <Box position="absolute" top="58%" right="50px">
            <Link href="/list" color="gray">
              <HStack gap={1}>
                <Icon icon={faChevronRight} size="2xl" />
                <Text fontSize="20px" fontWeight="bold">
                  一覧ページへ
                </Text>
              </HStack>
            </Link>
          </Box>
        )}
      </Box>
    </Box>
  );
}
