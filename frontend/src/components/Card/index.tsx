import { SectionHeader } from "../SectionHeader";
import { CardGroup } from "./CardGroup";

export const Card = () => {
  //fetch
  const lists = [
    "シャンプー",
    "せっけん 詰め替え",
    "洗剤",
    "リンス",
  ] as string[];

  return (
    <>
      <SectionHeader title="日用品一覧" />
      <CardGroup lists={lists} />
    </>
  );
};
