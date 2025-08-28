import { useEffect, useState } from "react";
import axios from "../api/axios";

export default function AdminPage() {
  const [data, setData] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/admin");
        setData(typeof res.data === "string" ? res.data : JSON.stringify(res.data));
      } catch (err) {
        const msg = err?.response?.data?.message || "Failed to load";
        setError(msg);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container">
      <div className="card stack">
        <h2 className="heading">Admin Panel</h2>
        {data && <div className="alert alert-success">{data}</div>}
        {error && <div className="alert alert-error">{error}</div>}
      </div>
    </div>
  );
}

