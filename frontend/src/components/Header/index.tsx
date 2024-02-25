import { Box, HStack } from "@yamada-ui/layouts";
import { Logo } from "./logo";

export const Header = () => {
  return (
    <Box
      height="8rem"
      width="full"
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
          height="100%"
          position="absolute"
          right="0px"
          justifyContent="space-between"
          paddingRight="5rem"
        >
          <Box>my page</Box>
          <Box>設定</Box>
          <Box>設定</Box>
        </HStack>
      </HStack>
    </Box>
  );
};
