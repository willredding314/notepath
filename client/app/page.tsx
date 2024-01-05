'use client'
import API from "../api"
import { useEffect, useMemo, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import AgnosticNavbar from "./components/AgnosticNavbar";
import Stars from "./components/stars";

export default function Home() {

  const [user, setUser] = useState("")

  const getUser = async () => {
    var res = await API.get("/login")
    if (res.data["status"] === "success") {
      setUser(res.data["username"])
    }
  }

  useEffect(() => {
    getUser()
  }, [])

  return (
    <div className="min-h-screen">
      <Stars />
      <AgnosticNavbar/>
      <div className="h-screen flex items-center justify-center columns-1">
        <div className="columns-1">
          <p className="text-4xl pb-8">Welcome to Notepath</p>
          <p>Make your notes accessible by API.</p>
        </div>
      </div>
    </div>
  )
}
