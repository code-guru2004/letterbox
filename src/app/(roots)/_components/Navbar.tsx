'use client'
import React from 'react'
import { User } from 'next-auth'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { CircleUserRound, LogIn } from 'lucide-react';
import Image from 'next/image';

function Navbar() {
    const { data: session } = useSession();
    const user: User = session?.user as User;

    const handleLogout = () => {
        signOut();
    }

    return (
        <nav className='p-4 md:p-6 shadow-md mb-1 w-full'>
            <div className="container mx-auto w-full flex flex-row md:flex-row justify-between items-center">
                <Link href={"/"} className="text-xl font-bold mb-4 md:mb-0">
                <Image
                    src={'/logo.png'}
                    width={150}
                    height={150}
                    alt='logo'
                />
                </Link>

                <div className="flex items-center"> {/* Adjusting the space between the items */}
                    {
                        session ? (
                            <div className='mr-3 flex items-center gap-5'>
                                <div className='relative'>
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <div>
                                                    <CircleUserRound className="w-6 h-6 text-gray-700" />
                                                </div>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>{user.username || user?.email}</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </div>

                                <Button className="" onClick={handleLogout}>Logout</Button>
                            </div>
                        ) : (
                            <Link href={"/sign-in"} className="md:inline-block bg-black p-3"><LogIn className='ml-1.5'/>Login</Link>
                        )
                    }
                </div>
            </div>
        </nav>
    )
}

export default Navbar
