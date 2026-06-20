'use client';

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { signInSchema} from '@/src/schemas/signInSchema';
import axios, { AxiosError } from 'axios';
import { toast } from "sonner";
import {Form, FormControl, FormField, FormItem, FormLabel}  from "@/components/ui/form";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import  Link  from 'next/link';
import { signIn } from 'next-auth/react';

interface ApiResponse {
  success: boolean;
  message: string;
}

const Page = () => {

  const [usernameMessage, setUsernameMessage] = useState<string | null>(null);
  const router = useRouter();

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      password: '',
      identifier: '',
    },
  });

 
  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    const result = await signIn("credentials", {
      identifier: data.identifier,
      password: data.password,
      redirect: false,
    });

    if (result?.error) {
      toast.error("Incorrect password or email. Please try again.");
    } 
    if (result?.url) {
      router.replace('/dashboard');

    }
  }
  return (
  

  <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
    <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-md">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">
          Join Mystery Message
        </h1>

        <p className="text-gray-600">
          Sign in to start your anonymous adventure
        </p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5"
        >
          {/* Username */}
          <FormField
            control={form.control}
            name="identifier"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email/Username</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="email/username"
                    {...field}
                  />
                 
                </FormControl>
                
              </FormItem>
            )}
          />

        

          {/* Password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="password"
                    {...field}
                  />
                </FormControl>
                
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded" 
          >
            Sign In
          </Button>
        </form>
      </Form>

      <div className="text-center">
        <p className="text-sm text-gray-600">
          Already a member?{" "}
          <Link
              href="/sign-in"
              className="font-medium text-blue-600 hover:text-blue-800"
            >
              Sign In
            </Link>
        </p>
      </div>
    </div>
  </div>
);


};

export default Page;  