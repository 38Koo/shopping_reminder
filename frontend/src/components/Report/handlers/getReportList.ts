import useSWR from "swr";
import { authenticatedRequestFetcher } from "../../../utils/authenticatedRequestFetcher";

export const getReportList = () => {
  const fetcher = authenticatedRequestFetcher();

  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_SERVER_DOMAIN}/api/report`,
    fetcher
  );
  return { data, error };
};
