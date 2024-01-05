"use client"

import { useState } from "react";
import AgnosticNavbar from "../../../../components/AgnosticNavbar";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useParams } from "next/navigation";
import EditorWrapper from "../../../../components/EditorWrapper";
import Stars from "../../../../components/stars";

export default function Note() {

    const user = "" + useParams()["id"]
    const noteID = "" + useParams()["noteid"]

    return (
        <div className="min-h-screen">
            <AgnosticNavbar />
            <Stars />
            <EditorWrapper user={user} noteID={noteID}/>
        </div>
    )
}