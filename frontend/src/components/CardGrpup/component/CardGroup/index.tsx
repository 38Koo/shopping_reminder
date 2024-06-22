import { Box, SimpleGrid } from "@yamada-ui/react";
import { CardItem } from "../CardItem";
import { CardItemType } from "../../types/CardItemType";

type CardGroupProps = {
  list: CardItemType[];
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
          return <CardItem key={index} item={item} />;
        })}
      </SimpleGrid>
    </Box>
  );
};
