import { useAuth } from "@clerk/nextjs";
import useSWR from "swr";

export const getItemList = () => {
  const { getToken } = useAuth();

  const fetcher = async (url: string) => {
    const token = await getToken();
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch");
    }

    return res.json();
  };

  const { data, error } = useSWR("http://localhost:8989/api/list", fetcher);
  return { data, error };
};
