import { Box } from "@yamada-ui/react";
import { CardFooter } from "./CardFooter";
import { CardGroup } from "./CardGroup";
import { CardItemType } from "./types/CardItemType";

type CardProps = {
  list: CardItemType[];
};

export const Card = ({ list }: CardProps) => {
  return (
    <>
      <CardGroup list={list} />
      <CardFooter />
      <Box height="150px" />
    </>
  );
};
