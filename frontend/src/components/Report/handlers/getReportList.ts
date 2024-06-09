import useSWR from "swr";
import { authenticatedRequestFetcher } from "../../../utils/authenticatedRequestFetcher";

export const getReportList = () => {
  const fetcher = authenticatedRequestFetcher();

  const { data, error } = useSWR("http://localhost:8989/api/report", fetcher);
  return { data, error };
};
