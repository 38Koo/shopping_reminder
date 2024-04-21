import { useEffect } from "react";
import { Card } from "../../components/Card";
import { currentUser, useAuth, useUser } from "@clerk/nextjs";

export default function ListPage() {
  const { getToken } = useAuth();

  useEffect(() => {
    const getLists = async () => {
      try {
        const token = await getToken();

        const response = await fetch("http://localhost:8989/api/list", {
          headers: { Authorization: `Bearer ${token}` },
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        // レスポンス処理
        const data = await response.json();

        console.log(data);
      } catch (error) {
        console.error("Failed to fetch:", error);
      }
    };
    getLists();
  }, []);
  return <Card />;
}
