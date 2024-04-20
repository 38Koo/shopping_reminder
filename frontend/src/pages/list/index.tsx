import { useEffect } from "react";
import { Card } from "../../components/Card";

export default function ListPage() {
  useEffect(() => {
    const getLists = async () => {
      try {
        const response = await fetch("http://localhost:8989/api/list");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        // レスポンス処理
      } catch (error) {
        console.error("Failed to fetch:", error);
      }
    };
    getLists();
  }, []);
  return <Card />;
}
