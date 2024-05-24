import React, { useState } from "react";
import { useRouter } from "next/router";
import api from "../services/api";
import NavBar from "../components/NavBar";
import styles from "../styles/Login.module.css";

export default function login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await api.post("/auth/login", { username, password })
    .then((response ) => {
      if (response) {
        localStorage.setItem("token", response.data.access_token);
      }
    })
    .catch((error) => {
      console.log(error);
      alert("Invalid credentials");
    })
    router.push("/");
  };

  return (
    <>
      <NavBar />
      <div className={styles.container}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <h2>Login</h2>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </>
  );
}
