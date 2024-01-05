"use client"
import { useParams } from 'next/navigation'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import API from '../../../api'
import AgnosticNavbar from '../../components/AgnosticNavbar'
import Link from 'next/link'
import { Button } from "@nextui-org/react";
import { MouseEvent } from 'react';

export default function User() {

    const userPath = "" + useParams()["id"]
    const [pages, setPages] = useState([])
    const [newPage, setNewPage] = useState('')
    const [showModal, setShowModal] = useState(false)

    const getPages = useEffect(() => {
        API.get(userPath).then((res) => setPages(res.data["pages"]))
    }, [])

    const handleNewPageChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setNewPage(event.target.value)
    }

    const handleSubmitNew = async (e: FormEvent<HTMLFormElement>) => {
        //complete this
        setShowModal(false)
    }

    const handleShowModal = async (e: MouseEvent<HTMLButtonElement>) => {
        setShowModal(true)
    }

    const handleCloseModal = async (e: MouseEvent<HTMLButtonElement>) => {
        setShowModal(false)
    }

    return (
        <div className="min-h-screen bg-purple">
            <AgnosticNavbar />
            <div className="p-5 ">
                <div>
                    <Button onClick={handleShowModal}>Create New</Button>
                </div>
                {
                    pages.map((page) =>
                        <div className="bg-gray max-w-sm rounded overflow-hidden shadow-lg">
                            <div className="p-4 flex flex-col items-center justify-center whitespace-nowrap">
                                <div className="rounded border-purple border-solid border-2 p-1">
                                    <Link href={"/user/" + userPath + "/note/" + page["id"]} className="font-bold text-xl mb-2">{page["name"]}</Link>
                                </div>
                                <p>Available at: PUBURL./pub/api/{userPath}/page/{page["name"]}</p>
                            </div>
                        </div>
                    )
                }
            </div>
            {showModal &&
                <div className="fixed inset-0 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
                    <div className="p-8 border w-96 shadow-lg rounded-md bg-gray">
                        <div className="text-center">
                            <form onSubmit={handleSubmitNew}>
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Document Title:
                                    <textarea className="text-black shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight" value={newPage} onChange={handleNewPageChange} />
                                </label>
                                <input type="submit" value="Submit" />
                            </form>
                            <div className="flex justify-center mt-4">
                                <Button onClick={handleCloseModal}>Close</Button>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}