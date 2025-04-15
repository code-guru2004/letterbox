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
import { CircleUserRound } from 'lucide-react';
  
function Navbar() {
    const { data: session } = useSession();
    //console.log(data);

    const user: User = session?.user as User;
    const handleLogout = () => {
        signOut();
    }
    return (
        <nav className='p-4 md:p-6 shadow-md mb-1'>
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                <Link href={"#"} className="text-xl font-bold mb-4 md:mb-0">LetterBox</Link>
                {
                    session ? (
                        <>
                            <div className='hover:bord'>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <div ><CircleUserRound /></div>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>{user.username || user?.email}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>

                            <Button onClick={handleLogout}>Logout</Button>
                        </>
                    ) : (
                        <Link href={"/sign-in"}>Login</Link>
                    )
                }
            </div>
        </nav>
    )
}

export default Navbar