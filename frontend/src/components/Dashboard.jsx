import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "../api/axios";

export default function Dashboard() {
  const { user, logout } = useContext(AuthContext);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const roleRank = { user: 1, manager: 2, admin: 3 };

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
    <div className="container">
      <div className="toolbar">
        <h2 className="heading">Welcome, {user?.name}</h2>
        <button className="btn btn-secondary" onClick={logout}>Logout</button>
      </div>
      <div className="card stack">
        <p className="subtle">Role: {user?.role}</p>
        <div className="button-row">
          {roleRank[user?.role] >= roleRank.user && (
            <button className="btn btn-primary" onClick={() => callEndpoint("/user")}>Call /user</button>
          )}
          {roleRank[user?.role] >= roleRank.manager && (
            <button className="btn btn-primary" onClick={() => callEndpoint("/manager")}>Call /manager</button>
          )}
          {roleRank[user?.role] >= roleRank.admin && (
            <button className="btn btn-primary" onClick={() => callEndpoint("/admin")}>Call /admin</button>
          )}
        </div>
        {message && <div className="alert alert-success">{message}</div>}
        {error && <div className="alert alert-error">{error}</div>}
      </div>
    </div>
  );
}
