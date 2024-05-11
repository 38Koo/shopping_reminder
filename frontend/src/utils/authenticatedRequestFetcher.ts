import { useAuth } from "@clerk/nextjs";

export const authenticatedRequestFetcher = () => {
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

  return fetcher;
};
