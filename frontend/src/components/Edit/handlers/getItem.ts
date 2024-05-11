import useSWR from "swr";
import { authenticatedRequestFetcher } from "../../../utils/authenticatedRequestFetcher";

export const getItem = (itemID: number) => {
  const fetcher = authenticatedRequestFetcher();

  const { data, error } = useSWR(
    `http://localhost:8989/api/item/${itemID}`,
    fetcher
  );
  return { data, error };
};
