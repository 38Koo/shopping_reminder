import { Box, Grid, SimpleGrid } from "@yamada-ui/react";
import { CardItem } from "../CardItem";

type CardGroupProps = {
  lists: string[];
};

export const CardGroup = ({ lists }: CardGroupProps) => {
  return (
    <Box width="calc(100% - 6rem)">
      <SimpleGrid width="100%" columns={{ base: 4, md: 1 }} paddingY="10px">
        {lists.map((list, index) => {
          return <CardItem key={index} list={list} />;
        })}
      </SimpleGrid>
    </Box>
  );
};
