"use client"

import { useEffect, useState } from "react"
import AnonNavbar from "./AnonNavbar"
import AuthNavbar from "./AuthNavbar"
import API from "../../api"

export default function Home() {

    const [user, setUser] = useState("")
  
    const getUser = async () => {
      var res = await API.get("/login")
      if (res.data["result"] === "success") {
        setUser(res.data["username"])
      }
    }
    
    useEffect(() => {
      getUser()
    }, [])
    
    return (
      <div>
        {user === "" && <AnonNavbar/>}
        {user !== "" && <AuthNavbar username={user}/>}
      </div>
    )

    if (user === "") {
        return (<AnonNavbar/>)
    } else {
        return (<AuthNavbar username={user} />)
    }
    
}