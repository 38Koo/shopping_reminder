import { Box, HStack } from "@yamada-ui/layouts";
import { SignOutButton } from "@clerk/nextjs";
import { Button } from "@yamada-ui/react";
import { useRouter } from "next/router";
import { Logo } from "./Logo";
import { Icon } from "@yamada-ui/fontawesome";
import { faHouseChimney } from "@fortawesome/free-solid-svg-icons";
import { faFilePen } from "@fortawesome/free-solid-svg-icons";

export const Header = () => {
  const router = useRouter();

  const isListPage = router.pathname === "/list";
  const isReportPage = router.pathname === "/report";

  return (
    <Box
      height="8rem"
      width="100%"
      position="fixed"
      zIndex={1000}
      top={0}
      bgColor="white"
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
      <HStack
        width="100%"
        height="calc(8rem - 3px)"
        position="absolute"
        right="0px"
        justifyContent="space-between"
        paddingRight="2rem"
      >
        <Box paddingLeft="30px">
          <Logo />
        </Box>
        <HStack gap={10}>
          <Icon
            icon={faHouseChimney}
            size="5xl"
            color={isListPage ? "gray" : "black"}
            onClick={() => !isListPage && router.push("/list")}
          ></Icon>
          <Icon
            icon={faFilePen}
            size="5xl"
            color={isReportPage ? "gray" : "black"}
            onClick={() => !isReportPage && router.push("/report")}
          ></Icon>
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
        </HStack>
      </HStack>
    </Box>
  );
};
