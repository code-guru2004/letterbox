'use client'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import React, { useRef, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Message } from "@/model/user.model"
import axios from "axios"
import toast from "react-hot-toast"
import { Trash } from "lucide-react"
import MessageDialog from "./MessageDialog"
import html2canvas from 'html2canvas'

type MessageCardProps = {
    message: Message,
    onMessageDelete: (messageId: string) => void;
}

function MessageCard({ message, onMessageDelete }: MessageCardProps) {
    const [dialogOpen, setDialogOpen] = useState(false)
    const cardRef = useRef<HTMLDivElement>(null);
    async function handleDeleteConfirm() {
        const resp = await axios.delete(`/api/deleteMessage/${message._id}`);

        toast.success("Message Deleted");

        onMessageDelete(message._id as string);
    }
    const handleDownload = async () => {
        if (!cardRef.current) return;

        // Make sure it's hidden but still rendered
        const canvas = await html2canvas(cardRef.current, {
            backgroundColor: '#ffffff',
            scale: 2,
        });

        const dataURL = canvas.toDataURL("image/jpeg", 1.0);
        const link = document.createElement("a");
        link.href = dataURL;
        link.download = "message-card.jpg";
        link.click();
    };
    return (
        <>
        <Card onClick={() => setDialogOpen(true)}>
            <CardContent className="flex justify-between">
                <p className="text-base text-gray-700 line-clamp-1">
                    {message.content.length > 20
                        ? message.content.slice(0, 30) + '...'
                        : message.content}
                </p>
                <div className="flex gap-2">
                    <Button variant="secondary" onClick={handleDownload}>Download</Button>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="destructive" className="p-2 cursor-pointer hover:bg-red-500"><Trash /></Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete your
                                    message and remove it from our servers.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={handleDeleteConfirm}>Continue</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </CardContent>
            <CardFooter className="text-xs text-gray-500">
                📅 {new Date(message.createdAt).toLocaleString()}
            </CardFooter>
        </Card>

        {/* Hidden div for export */}
        <div ref={cardRef} className="p-4 w-[300px] absolute -top-[9999px] -left-[9999px] bg-white shadow rounded border">
            <p className="text-sm text-gray-500">📅 {new Date(message.createdAt).toLocaleString()}</p>
            <p className="text-base text-gray-800 mt-2">
                {message.content}
            </p>
        </div>
    </>


    )
}

export default MessageCard