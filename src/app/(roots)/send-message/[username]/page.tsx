'use client'
import { messageSchema } from '@/schemas/messageSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams } from 'next/navigation'
import React from 'react'
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

function SendMessage() {
  const { username } = useParams()
  console.log(username);

  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      content: ""
    }
  });
  async function onSubmit(data: z.infer<typeof messageSchema>) {
    //console.log({username:username,...data});
    
    try {
      const resp = await axios.post<ApiResponse>('/api/send-message',{username:username,...data})
      toast.success(resp.data.message)
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast.error(axiosError.response?.data.message || "Failed to send message")
    }
  }
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message</FormLabel>
                <FormControl>
                  <Textarea placeholder="message" {...field} onChange={(e)=>field.onChange(e)}/>
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Send Message</Button>
        </form>
      </Form>
    </div>
  )
}

export default SendMessage