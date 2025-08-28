import { useEffect, useState } from "react";
import axios from "../api/axios";

export default function ManagerPage() {
  const [data, setData] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/manager");
        setData(typeof res.data === "string" ? res.data : JSON.stringify(res.data));
      } catch (err) {
        const msg = err?.response?.data?.message || "Failed to load";
        setError(msg);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2>Manager Panel</h2>
      {data && <div style={{ color: "green" }}>{data}</div>}
      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
}

