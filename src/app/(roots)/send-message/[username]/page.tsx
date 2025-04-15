'use client'
import { messageSchema } from '@/schemas/messageSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams } from 'next/navigation'
import React, { useState } from 'react'
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
import axios, { AxiosError } from 'axios';
import { ApiResponse } from '@/types/ApiResponse';
import toast from 'react-hot-toast';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Loader, Send } from 'lucide-react';

function SendMessage() {
  const { username } = useParams()
  //console.log(username);
  const [suggestMessages, setSuggestMessages] = useState([]);
  const [suggestmessageLoading, setSuggestmessageLoading] = useState(false)

  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      content: ""
    }
  });
  async function onSubmit(data: z.infer<typeof messageSchema>) {
    //console.log({username:username,...data});

    try {
      const resp = await axios.post<ApiResponse>('/api/send-message', { username: username, ...data })
      toast.success(resp.data.message)
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast.error(axiosError.response?.data.message || "Failed to send message")
    }
  }
  const getMessageByAI = async () => {
    try {
      setSuggestmessageLoading(true)
      const resp = await axios.post('/api/suggest-messages');
      console.log(resp.data.suggestMessages);
      setSuggestMessages(resp.data.suggestMessages)
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast.error(axiosError.response?.data.message || "Failed to get messages")
    } finally {
      setSuggestmessageLoading(false)
    }
  }
  const handleMessageClick = (message: string) => {
    form.setValue('content', message);
  };
  return (
    <div className="container mx-auto my-8 px-4 sm:px-6 md:px-8 py-6 bg-white rounded-xl shadow-md max-w-4xl">
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-semibold">Message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Type your message here..."
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[120px]"
                  {...field}
                  onChange={(e) => field.onChange(e)}
                />
              </FormControl>
              <FormDescription className="text-sm text-gray-500">
                This is your public message. Be creative!
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full sm:w-auto py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 flex items-center justify-center"
        >
          Send Message <Send />
        </Button>
      </form>
    </Form>
  
    <div className="space-y-6 my-10">
      <div className="space-y-2">
        <Button
          onClick={getMessageByAI}
          className="w-full sm:w-auto bg-green-500 hover:bg-green-600 transition-all duration-200"
          disabled={suggestmessageLoading}
        >
          {suggestmessageLoading ? (
            <span className='flex items-center gap-2'>
              <span className='animate-spin'><Loader /></span>
              Loading...
            </span>
          ) : (
            "Suggest Messages"
          )}
        </Button>
        <p className="text-sm text-gray-600">Click on any message below to select it.</p>
      </div>
  
      <Card className="w-full">
        <CardHeader>
          <h3 className="text-xl font-semibold text-gray-800">Messages</h3>
        </CardHeader>
        <CardContent className="flex flex-col space-y-3 gap-5 ">
          {suggestMessages.length > 0 ? (
            suggestMessages.map((message, index) => (
              <div
                key={index}
                
                className="text-left whitespace-normal break-words outline-none p-3 bg-transparent cursor-pointer text-black hover:bg-gray-200 shadow-md rounded-md"
                onClick={() => handleMessageClick(message)}
              >
                {index + 1}. {message}
              </div>
            ))
          ) : (
            <p className='text-sm text-gray-500'>No  Suggested Message Found</p>
          )}
        </CardContent>
      </Card>
    </div>
  
    <Separator className="my-8" />
  
    <div className="text-center">
      <p className="mb-4 text-base font-medium text-gray-700">Get Your Message Board</p>
      <Link href="/sign-up">
        <Button className="bg-purple-600 hover:bg-purple-700 text-white transition-all duration-200">
          Create Your Account
        </Button>
      </Link>
    </div>
  </div>
  

  )
}

export default SendMessage