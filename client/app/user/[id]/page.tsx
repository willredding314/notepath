"use client"
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import API from '../../../api'
import AgnosticNavbar from '../../components/AgnosticNavbar'
import Stars from '../../components/stars'
import Link from 'next/link'

export default function User() {

    const userPath = "" + useParams()["id"]
    const [pages, setPages] = useState([])

    const getPages = useEffect(() => {
        API.get(userPath).then((res) => setPages(res.data["pages"]))
        console.log(pages)
    }, [])

    return (
        <div className="bg-purple min-h-screen">
            <AgnosticNavbar />
            <Stars/>
            <div className="p-5 grid grid-cols-4 gap-4">
                {
                    pages.map((page) =>
                        <div className="bg-gray max-w-sm rounded overflow-hidden shadow-lg">
                            <Link href={"/" + userPath + "/note/" + page["id"]} className="font-bold text-xl mb-2">{page['name']}</Link>
                        </div>
                    )
                }
            </div>
        </div>
    )
}