import { SectionHeader } from "../SectionHeader";
import { ReportFormGroup } from "./ReportFormGroup";
import { getReportList } from "./handlers/getReportList";

export const Report = () => {
  const { data } = getReportList();
  console.log(data);

  return (
    <>
      <SectionHeader title="買い物報告" />
      {!!data && <ReportFormGroup data={data} />}
    </>
  );
};
