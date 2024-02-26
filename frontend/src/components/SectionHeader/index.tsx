import { Box, Heading } from "@yamada-ui/react";

type SectionHeaderProps = {
  title: string;
};

export const SectionHeader = ({ title }: SectionHeaderProps) => {
  return (
    <Heading
      as="h1"
      width="full"
      paddingY="20px"
      paddingLeft="30px"
      fontSize="32px"
      fontWeight="bold"
    >
      {title}
    </Heading>
  );
};
