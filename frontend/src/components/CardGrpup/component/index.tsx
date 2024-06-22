import { CardGroup } from "./CardGroup";
import { CardItemType } from "../types/CardItemType";
import { CardFooter } from "./CardFooter";

type CardProps = {
  list: CardItemType[];
};

export const Card = ({ list }: CardProps) => {
  return (
    <>
      <CardGroup list={list} />
      <CardFooter />
    </>
  );
};
