import { useEffect } from "react";
import { Card } from "../../components/Card";

export default function ListPage() {
  useEffect(() => {
    const a = async () => {
      try {
        const b = await fetch("http://localhost:8989/api/list");
        if (!b.ok) {
          throw new Error(`HTTP error! status: ${b.status}`);
        }
        console.log(b);
      } catch (e) {
        console.error(e);
      }
    };

    a();
  }, []);
  return <Card />;
}
