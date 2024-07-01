import { CardGroup } from "./CardGroup";
import { CardFooter } from "./CardFooter";
import { CardDataType } from "../types/CardItemType";

type CardProps = {
  list: CardDataType[];
};

export const Card = ({ list }: CardProps) => {
  return (
    <>
      <CardGroup list={list} />
      <CardFooter />
    </>
  );
};
