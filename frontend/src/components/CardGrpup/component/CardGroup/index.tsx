import { Box, SimpleGrid } from "@yamada-ui/react";
import { CardItem } from "../CardItem";
import { CardDataType } from "../../types/CardItemType";

type CardGroupProps = {
  list: CardDataType[];
};

export const CardGroup = ({ list }: CardGroupProps) => {
  return (
    <Box width="100%">
      <SimpleGrid
        width="100%"
        columns={{ base: 4, md: 1 }}
        paddingY="10px"
        gap="md"
      >
        {list.map((item, index) => {
          return <CardItem key={index} data={item} />;
        })}
      </SimpleGrid>
    </Box>
  );
};
