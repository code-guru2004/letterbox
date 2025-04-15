'use client'

import {
    Card,
    CardContent,
    CardFooter,
} from "@/components/ui/card"
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
 
    DialogFooter,
} from "@/components/ui/dialog"

import React, { useRef, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Message } from "@/model/user.model"
import axios from "axios"
import toast from "react-hot-toast"
import { Trash, Download } from "lucide-react"
import { toPng } from 'html-to-image'

type MessageCardProps = {
    message: Message,
    onMessageDelete: (messageId: string) => void;
}

function MessageCard({ message, onMessageDelete }: MessageCardProps) {
    const [viewDialogOpen, setViewDialogOpen] = useState(false)
    const dialogRef = useRef<HTMLDivElement>(null)

    // async function handleDeleteConfirm() {
    //     await axios.delete(`/api/deleteMessage/${message._id}`);
    //     toast.success("Message Deleted");
    //     onMessageDelete(message._id as string);
    // }

    const handleDownload = async () => {
        if (!dialogRef.current) return
        try {
            const dataUrl = await toPng(dialogRef.current)
            const link = document.createElement("a")
            link.download = `message-${message._id}.png`
            link.href = dataUrl
            link.click()
        } catch (error) {
            console.error("Failed to generate image", error)
            toast.error("Download failed")
        }
    }

    return (
        <div className="">
            <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
                <Card
                    className="cursor-pointer hover:shadow-md"
                    onClick={() => setViewDialogOpen(true)}
                >
                    <CardContent className="flex justify-between py-4">
                        <p className="text-base text-gray-700 line-clamp-1">
                            {message.content.length > 30
                                ? message.content.slice(0, 30) + '...'
                                : message.content}
                        </p>
                        <div className="flex gap-2">
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    {/* <Button
                                        variant="destructive"
                                        className="p-2 cursor-pointer hover:bg-red-500"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <Trash />
                                    </Button> */}
                                </AlertDialogTrigger>
                                <AlertDialogContent onClick={(e) => e.stopPropagation()}>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This action cannot be undone. This will permanently delete your
                                            message and remove it from our servers.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel onClick={(e) => e.stopPropagation()}>
                                            Cancel
                                        </AlertDialogCancel>
                                        {/* <AlertDialogAction
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                handleDeleteConfirm()
                                            }}
                                            className="bg-red-700 hover:bg-red-600"
                                        >
                                            Delete
                                        </AlertDialogAction> */}
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>
                    </CardContent>
                    <CardFooter className="text-xs text-gray-500">
                        📅 {new Date(message.createdAt).toLocaleString()}
                    </CardFooter>
                </Card>

                <DialogContent>
                    <div ref={dialogRef} className="bg-white p-4 rounded-md space-y-6 max-w-md overflow-auto">
                        <DialogHeader>
                            <DialogTitle>Letter from your closed one🧑‍🦰</DialogTitle>
                            
                        </DialogHeader>
                        <p className="text-sm text-gray-800 whitespace-pre-wrap break-words">
                            {message.content}
                        </p>
                        <p className="text-xs text-gray-500">
                            Created At: {new Date(message.createdAt).toLocaleString()}
                        </p>
                    </div>
                    <DialogFooter className="flex gap-2">
                        <Button variant="outline" onClick={handleDownload}>
                            <Download className="w-4 h-4 mr-2" /> Download as PNG
                        </Button>
                        <Button onClick={() => setViewDialogOpen(false)}>Close</Button>
                    </DialogFooter>
                </DialogContent>

            </Dialog>
        </div>
    )
}

export default MessageCard
