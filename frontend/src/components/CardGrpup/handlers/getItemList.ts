import useSWR from "swr";
import { authenticatedRequestFetcher } from "../../../utils/authenticatedRequestFetcher";

export const getItemList = () => {
  const fetcher = authenticatedRequestFetcher();

  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_SERVER_DOMAIN}/api/list`,
    fetcher
  );
  return { data, error };
};
