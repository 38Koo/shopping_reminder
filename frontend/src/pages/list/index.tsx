import { Card } from "../../components/Card";
import { CardNoItem } from "../../components/Card/CardNoItem";
import { getItemList } from "../../components/Card/handlers/getItemList";
import { SectionHeader } from "../../components/SectionHeader";

export default function ListPage() {
  const { data } = getItemList();

  return (
    <>
      <SectionHeader title="日用品一覧" />
      {data ? <Card list={data} /> : <CardNoItem />}
    </>
  );
}
