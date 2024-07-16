import useSWR from "swr";
import { authenticatedRequestFetcher } from "../../../utils/authenticatedRequestFetcher";

export const useGetItem = (itemID: string | string[] | undefined) => {
  const fetcher = authenticatedRequestFetcher();
  console.log(!itemID && !Array.isArray(itemID));

  const { data, error } = useSWR(
    !!itemID && !Array.isArray(itemID)
      ? `${process.env.NEXT_PUBLIC_API_SERVER_DOMAIN}/api/item/${itemID}`
      : null,
    fetcher
  );

  return {
    data,
    error,
  };
};
