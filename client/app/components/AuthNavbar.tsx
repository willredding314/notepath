"use client"

import Link from 'next/link';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { MouseEvent } from 'react';
import { useRouter } from 'next/navigation';
import API from '../../api'

interface AuthNavbarProps {
    username: string
}

const AuthNavbar = (props: AuthNavbarProps) => {

    const router = useRouter()

    const handleLogout = async (e: MouseEvent<HTMLButtonElement>) => {
        const res = await API.get("/logout")
        if (res.status == 200) {
            router.push("/")
        }
    }

    return (
        <div className="bg-purple">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <span className="self-center text-2xl font-semibold whitespace-nowraptext-white">Notepath</span>
                </Link>
                <div className="w-full md:block md:w-auto" id="navbar-default">
                    <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0  bg-gray-800 md:bg-transparent  border-gray-700">
                        <li>
                            <Link href={"/user/" + props.username} className="block py-2 px-3 rounded md:border-0 md:p-0 text-white md:hover:text-blue-500 hover:bg-gray-700 hover:text-white md:hover:bg-transparent">{props.username}</Link>
                        </li>
                        <li>
                            <button onClick={handleLogout} className="block py-2 px-3 rounded md:border-0 md:p-0 text-white md:hover:text-blue-500 hover:bg-gray-700 hover:text-white md:hover:bg-transparent">Logout</button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default AuthNavbar;