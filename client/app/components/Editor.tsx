import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "./quill-overrides.css"
import API from "../../api"
import {Button, ButtonGroup} from "@nextui-org/react";
import { MouseEvent } from 'react';

interface EditorProps {
    user: string, 
    noteID: string
}

export default function Editor(props: EditorProps) {

    const [value, setValue] = useState('');
    const pagePath = "/page/" + props.noteID

    const getPages = useEffect(() => {
        API.get(pagePath).then((res) => setValue(res.data["content"]))
    }, [])

    const handleSave = async (e: MouseEvent<HTMLButtonElement>) => {
        const res = await API.post(pagePath, {"content": value})
    }

    return (
        <div className="min-h-screen">
            <div className="p-6">
                {document && 
                    <div>
                        <div className="bg-darkgray">
                            <ReactQuill style={{color: "white"}} theme="snow" value={value} onChange={setValue} />
                        </div>
                        <Button onClick={handleSave}>Save</Button>
                    </div>
                }
                
            </div>
        </div>
    )
}