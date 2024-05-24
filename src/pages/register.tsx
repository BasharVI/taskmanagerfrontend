import React, { useState } from "react";
import { useRouter } from "next/router";
import api  from "../services/api";
import NavBar from '../components/NavBar'
import styles from "../styles/Register.module.css";

export default function register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await api.post("/auth/register", { username, email, password })
    .then((response) =>{ 
    if(response){
        alert("User registered successfully");
    }});
    router.push("/login");
  };

  return (
    <>
    <NavBar/>
    <div className={styles.container}>
    <form onSubmit={handleSubmit} className={styles.formGroup}>
    <h2>Register</h2>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        className={styles.input}
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className={styles.input}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className={styles.input}
      />
      <button type="submit" className={styles.button}>Register</button>
    </form>

    </div>
   
    </>
    
  );
}