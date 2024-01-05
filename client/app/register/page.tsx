"use client"
import { ChangeEvent, FormEvent, useState } from "react"
import { useNavigate } from "react-router-dom"
import API from "../../api"
import { RedirectType, redirect, useRouter } from "next/navigation"

export default function Register() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const router = useRouter()

    const handleUsernameChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setUsername(event.target.value)
    }

    const handleEmailChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setEmail(event.target.value)
    }

    const handlePasswordChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setPassword(event.target.value)
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        var res = await API.post("/register", {
            "username": username,
            "password": password, 
            "email": email
        })

        if (res.status == 200) {
            router.push("/user/" + res.data)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Username:
                <textarea value={username} onChange={handleUsernameChange} />
            </label>
            <label>
                Email:
                <textarea value={email} onChange={handleEmailChange} />
            </label>
            <label>
                Password:
                <textarea value={password} onChange={handlePasswordChange} />
            </label>
            <input type="submit" value="Submit" />
        </form>
    )
}