import dynamic from "next/dynamic";
import { useMemo } from "react";

interface EditorWrapperProps {
    user: string, 
    noteID: string
}

export default function EditorWrapper(props: EditorWrapperProps) {

    const DynamicEditor = useMemo(() => {
        return dynamic(() => import("./Editor"), {
            loading: () => <div className="min-h-screen bg-purple"></div>,
            ssr: false,
        });
    }, []);

    return (
        <DynamicEditor user={props.user} noteID={props.noteID}/>
    )
}