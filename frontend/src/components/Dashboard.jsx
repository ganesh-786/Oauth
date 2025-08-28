import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "../api/axios";

export default function Dashboard() {
  const { user, logout } = useContext(AuthContext);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const callEndpoint = async (path) => {
    setMessage("");
    setError("");
    try {
      const res = await axios.get(path);
      setMessage(typeof res.data === "string" ? res.data : JSON.stringify(res.data));
    } catch (err) {
      const msg = err?.response?.data?.message || "Request failed";
      setError(msg);
    }
  };

  return (
    <div>
      <h2>Welcome, {user?.name}</h2>
      <p>Role: {user?.role}</p>
      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <button onClick={() => callEndpoint("/user")}>Call /user</button>
        <button onClick={() => callEndpoint("/manager")}>
          Call /manager
        </button>
        <button onClick={() => callEndpoint("/admin")}>
          Call /admin
        </button>
      </div>
      {message && <div style={{ color: "green" }}>{message}</div>}
      {error && <div style={{ color: "red" }}>{error}</div>}
      <button onClick={logout}>Logout</button>
    </div>
  );
}
