'use client';

import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import {  z } from "zod"

import { useRouter } from "next/navigation"


import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader } from 'lucide-react'
import Link from "next/link";
import toast from "react-hot-toast";
import { signInSchema } from "@/schemas/signInSchema";
import { signIn } from "next-auth/react";

function SignIn() {


  const [isSubmitting, setIsSubmitting] = useState(false);

  const route = useRouter();

  // ZOD
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: "", //identifier = username | email
      password: ""
    }
  });



  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    setIsSubmitting(true)
    
      const result = await signIn('credentials',{
        redirect: false,
        identifier: data.identifier,
        password: data.password
      });
      //console.log(result);
      if(result?.error){
        toast.error("Incorrect Username or Password")
      }
      if(result?.url){
        toast.success("Login Successfully")
        route.push("/dashboard")
      }
    
      
      //toast.error("Incorrect Username or Password")
    
    
    
  }
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Join Letterbox
          </h1>
          <p className="mb-4">Sign in to start your anonymous adventure</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              name="identifier"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username / Email</FormLabel>
                  <FormControl>
                    <Input placeholder="username/email" {...field} />
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
            Not register?{' '}
            <Link href="/sign-up" className="text-blue-600 hover:text-blue-800">
              Sign-up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignIn