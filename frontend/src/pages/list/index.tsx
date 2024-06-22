import { Card } from "../../components/CardGrpup/component";
import { CardNoItem } from "../../components/CardGrpup/component/CardNoItem";
import { getItemList } from "../../components/CardGrpup/handlers/getItemList";
import { SectionHeader } from "../../components/SectionHeader/component";

export default function ListPage() {
  const { data } = getItemList();

  return (
    <>
      <SectionHeader title="日用品一覧" />
      {data ? <Card list={data} /> : <CardNoItem />}
    </>
  );
}
