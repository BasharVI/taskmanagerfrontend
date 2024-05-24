import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "../styles/NavBar.module.css";

const NavBar = () => {
    const router = useRouter();
    const [user,setuser]=useState()
    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem("user") || "null");
        
        setuser(user)

    },[])

    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        router.push("/login");
    };

    return (
        <div className={styles.navbar}>
            <h1 >Task Manager</h1>
            <nav>
                <ul className={styles.navbarLinks}>
                    {!user && <li >
                        <Link href="/register">
                            Register
                        </Link>
                    </li>}
                    {!user && <li >
                        <Link href="/login">
                            Login
                        </Link>
                    </li>}
                    {user && (<li>
                        <button onClick={handleLogout} className={styles.logoutButton}>
                            Logout
                        </button>
                    </li>)}
                </ul>
            </nav>
        </div>
    );
};

export default NavBar;
