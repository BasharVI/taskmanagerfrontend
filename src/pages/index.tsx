import React, { useEffect, useState } from "react";
import TaskList from "../components/TaskList";
import WithAuth from "@/components/WithAuth";
import NavBar from "@/components/NavBar";


 function Home() {
 const [isMounted,setIsmounted] = useState(false)

 useEffect(()=>{
    setIsmounted(true)
 },[])
  return (
    <>
        
       { isMounted && 
       <>
        <NavBar/>
        <TaskList/>
        </> }
    </>
         
  );
}

export default WithAuth(Home);