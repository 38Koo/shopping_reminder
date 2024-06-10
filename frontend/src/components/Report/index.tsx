import { useEffect, useState } from "react";
import { SectionHeader } from "../SectionHeader";
import { ReportFormGroup } from "./ReportFormGroup";
import { getReportList } from "./handlers/getReportList";
import { useAuth } from "@clerk/nextjs";

export const Report = () => {
  const { data } = getReportList();
  console.log(data);

  const [token, setToken] = useState<string | null>(null);

  const { getToken } = useAuth();

  useEffect(() => {
    const fetchToken = async () => {
      const fetchedToken = await getToken();
      setToken(fetchedToken);
    };

    fetchToken();
  }, [getToken]);

  return (
    <>
      <SectionHeader title="買い物報告" />
      {!!data && <ReportFormGroup data={data} token={token} />}
    </>
  );
};
