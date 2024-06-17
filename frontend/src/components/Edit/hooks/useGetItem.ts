import useSWR from "swr";
import { authenticatedRequestFetcher } from "../../../utils/authenticatedRequestFetcher";

export const useGetItem = (itemID: string | string[] | undefined) => {
  const fetcher = authenticatedRequestFetcher();
  console.log(!itemID && !Array.isArray(itemID));

  const { data, error } = useSWR(
    !!itemID && !Array.isArray(itemID)
      ? `http://localhost:8989/api/item/${itemID}`
      : null,
    fetcher
  );

  return {
    data,
    error,
  };
};
