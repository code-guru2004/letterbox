'use client';

import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { string, z } from "zod"
import { useDebounceCallback } from 'usehooks-ts'
import { useRouter } from "next/navigation"
import { signUpSchema } from "@/schemas/signUpSchema"
import axios, { AxiosError } from 'axios'
import { ApiResponse } from "@/types/ApiResponse";

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader, Loader2 } from 'lucide-react'
import Link from "next/link";
import toast from "react-hot-toast";

function SignUp() {

  const [username, setUsername] = useState("");
  const [usernameMessage, setUsernameMessage] = useState("");
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const debounced= useDebounceCallback(setUsername, 500);
  const route = useRouter();

  // ZOD
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: ""
    }
  });

  useEffect(() => {
    const checkUsernameUnique = async () => {
      if (username) {
        setIsCheckingUsername(true);
        setUsernameMessage("");
        try {
          const response = await axios.get(`/api/check-username-unique?username=${username}`);
          //console.log(response);
          let message = response.data.message
          setUsernameMessage(message)
        } catch (error) {
          const axiosError = error as AxiosError<ApiResponse>;
          setUsernameMessage(axiosError?.response?.data.message || "Error checking user")
        }
        finally {
          setIsCheckingUsername(false)
        }
      }

    }
    checkUsernameUnique();
  }, [username])

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    setIsSubmitting(true);

    try {
      const response = await axios.post('/api/sign-up', data);
      
      toast.success(response?.data.message)
      route.replace(`/verify/${username}`);
    } catch (error) {
      console.error("Error in sign-up user", error);
      const axiosErr = error as AxiosError<ApiResponse>;
      
      toast.error(axiosErr.response?.data.message ?? "Something went wrong")
    }
    finally {
      setIsSubmitting(false);
    }
  }
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Join True Feedback
          </h1>
          <p className="mb-4">Sign up to start your anonymous adventure</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              name="username"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="username" {...field} onChange={(e) => {
                      field.onChange(e)
                      debounced(e.target.value)
                    }} />
                  </FormControl>
                  {
                    isCheckingUsername && <Loader2 className="animate-spin" />
                  }
                 
                  {!isCheckingUsername && usernameMessage && (
                    <p
                      className={`text-sm ${
                        usernameMessage === 'Valid Username'
                          ? 'text-green-700'
                          : 'text-red-500'
                      }`}
                    >
                      🛑 {usernameMessage}
                    </p>
                  )}
                  
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="abc@gmail.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isSubmitting} className="w-full">{
              isSubmitting ? (
                <>
                  <Loader className="h-4 w-4 mr-2 animate-spin" />Holding Tight...
                </>
              ) : "Register"}</Button>
          </form>
        </Form>
        <div className="text-center mt-4">
          <p>
            Already a member?{' '}
            <Link href="/sign-in" className="text-blue-600 hover:text-blue-800">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignUp