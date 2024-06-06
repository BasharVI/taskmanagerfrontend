import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "../styles/NavBar.module.css";

const NavBar = () => {
  const router = useRouter();
  const [token, setToken] = useState<string>("");
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <div className={styles.navbar}>
      <h1>Task Manager</h1>
      <nav>
        <ul className={styles.navbarLinks}>
          {!token && (
            <li>
              <Link href="/register">Register</Link>
            </li>
          )}
          {!token && (
            <li>
              <Link href="/login">Login</Link>
            </li>
          )}
          {token && (
            <li>
              <button onClick={handleLogout} className={styles.logoutButton}>
                Logout
              </button>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
