'use client';

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDebounceCallback } from 'usehooks-ts';
import { useRouter } from 'next/navigation';
import { signUpSchema as SignUpSchema } from '@/src/schemas/signUpSchema';
import axios, { AxiosError } from 'axios';
import { toast } from "sonner";
import {Form, FormControl, FormField, FormItem, FormLabel}  from "@/components/ui/form";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Link, Loader2 } from 'lucide-react';

interface ApiResponse {
  success: boolean;
  message: string;
}

const Page = () => {
  const [username, setUsername] = useState('');
  const [usernameMessage, setUsernameMessage] = useState('');
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const debounced = useDebounceCallback(setUsername, 300);

  const router = useRouter();

  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      username: '',
      password: '',
      email: '',
    },
  });

  useEffect(() => {
    const checkUsernameUnique = async () => {
      if (!username) return;

      setIsCheckingUsername(true);
      setUsernameMessage('');

      try {
        const response = await axios.get<ApiResponse>(
          `/api/check-username-unique?username=${username}`
        );

        setUsernameMessage(response.data.message);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError<ApiResponse>;

          setUsernameMessage(
            axiosError.response?.data?.message ||
              'Username is already taken'
          );
        } else {
          setUsernameMessage('Something went wrong');
        }
      } finally {
        setIsCheckingUsername(false);
      }
    };

    checkUsernameUnique();
  }, [username]);
   const onSubmit = async (data: z.infer<typeof SignUpSchema>) => {  
    console.log('Form Data:', data);
    setIsSubmitting(true);
    try{
      await axios.post<ApiResponse>('/api/sign-up',data);
     toast.success("Account created successfully. Please sign in.");
      router.replace(`/verify/${username}`);
      setIsSubmitting(false);
    }
    catch(error){
    console.log("Error during sign up:", error);
   
    
        const axiosError = error as AxiosError<ApiResponse>;
    let errorMessage = 'An error occurred during sign up. Please try again.';
     toast.error("An error occurred during sign up. Please try again.");
    }
    setIsSubmitting(false);
   }

  return (
  

  <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
    <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-md">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">
          Join Mystery Message
        </h1>

        <p className="text-gray-600">
          Sign up to start your anonymous adventure
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
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    placeholder="username"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      debounced(e.target.value);
                    }}
                  />
                  {isCheckingUsername && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
                  {usernameMessage && (
                    <p className={`mt-1 text-sm ${usernameMessage === "Username is available." ? 'text-green-600' : 'text-red-600'}`}>
                      {usernameMessage}
                    </p>
                  )}
                </FormControl>
                
              </FormItem>
            )}
          />

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="email"
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
            disabled={isSubmitting}
            className="w-full"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please Wait
              </>
            ) : (
              "Sign Up"
            )}
          </Button>
        </form>
      </Form>

      <div className="text-center">
        <p className="text-sm text-gray-600">
          Already a member?{" "}
          <Link
            href="/sign-in"
            className="text-blue-600 hover:text-blue-800 font-medium b-2 border border-blue-600"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  </div>
);


};

export default Page;  