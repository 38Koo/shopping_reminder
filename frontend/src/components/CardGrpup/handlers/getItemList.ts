import useSWR from "swr";
import { authenticatedRequestFetcher } from "../../../utils/authenticatedRequestFetcher";

export const getItemList = () => {
  const fetcher = authenticatedRequestFetcher();

  const { data, error } = useSWR("http://localhost:8989/api/list", fetcher);
  return { data, error };
};
