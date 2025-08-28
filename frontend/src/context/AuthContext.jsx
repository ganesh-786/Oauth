import { createContext, useState, useEffect } from "react";
import axios from "../api/axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const [, payloadBase64] = token.split(".");
        const payloadJson = atob(payloadBase64);
        const payload = JSON.parse(payloadJson);
        setUser({ id: payload.id, role: payload.role, name: payload.username || "" });
      } catch {
        localStorage.removeItem("token");
        setUser(null);
      }
    }
  }, []);

  const login = async (username, password) => {
    const res = await axios.post("/login", { username, password });
    const { token } = res.data;
    localStorage.setItem("token", token);
    const [, payloadBase64] = token.split(".");
    const payload = JSON.parse(atob(payloadBase64));
    setUser({ id: payload.id, role: payload.role, name: username });
    return res.data;
  };

  const register = async ({ username, password, role }) => {
    await axios.post("/", { username, password, role });
    // Auto-login not provided by backend; require explicit login after register
    return { message: "Registered successfully" };
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
