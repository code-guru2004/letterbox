'use client'
import { verifySchema } from '@/schemas/verifySchema';
import { zodResolver } from '@hookform/resolvers/zod';
import axios, { AxiosError } from 'axios';
import { useParams, useRouter } from 'next/navigation'
import React, { use } from 'react'
import { useForm } from 'react-hook-form';

import { z } from 'zod';
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { ApiResponse } from '@/types/ApiResponse';
import toast from 'react-hot-toast';

function VerifyCode() {
    const route = useRouter();
    const actualParams = useParams();
    console.log(actualParams.username);

    // ZOD
    const form = useForm<z.infer<typeof verifySchema>>({
        resolver: zodResolver(verifySchema),
        defaultValues: {
            code: ""
        }
    });

    const onSubmit = async (data: z.infer<typeof verifySchema>) => {
        try {
            const resp = await axios.post("/api/verify-code", { username: actualParams.username, code: data.code })
            toast.success(resp?.data.message)
            route.replace("/dashboard")
        } catch (error) {
            console.error("Error in sign-up user", error);
                  const axiosErr = error as AxiosError<ApiResponse>;
                  let errorMsg = axiosErr.response?.data.message;
                  toast.error(errorMsg ?? "Unable to verify user")
        }
    }
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-800">
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
                        Verify User
                    </h1>
                    <p className="mb-4">Verify your username to go further</p>
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            name="code"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Verification Code</FormLabel>
                                    <FormControl>
                                        <Input placeholder="123456" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Verification code is sent to your registered email.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" >Verify</Button> 
                    </form>
                </Form>
            </div>
        </div>
    )
}

export default VerifyCode