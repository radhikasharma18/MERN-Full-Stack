'use client';

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDebounceValue } from 'usehooks-ts';
import { useRouter } from 'next/navigation';
import { signUpSchema as SignUpSchema } from '@/src/schemas/signUpSchema';
import axios, { AxiosError } from 'axios';
import { toast } from "sonner";

interface ApiResponse {
  success: boolean;
  message: string;
}

const Page = () => {
  const [username, setUsername] = useState('');
  const [usernameMessage, setUsernameMessage] = useState('');
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [debouncedUsername] = useDebounceValue(username, 300);

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
      if (!debouncedUsername) return;

      setIsCheckingUsername(true);
      setUsernameMessage('');

      try {
        const response = await axios.get<ApiResponse>(
          `/api/check-username-unique?username=${debouncedUsername}`
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
  }, [debouncedUsername]);
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
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className='w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md'>
            <div className='text-center'>
                <h1 className='text-4xl font-extrabold tracking-tight lg:text-5xl mb-6'>Join Mystrey Messages</h1>
                <p className='text-gray-600 mb-4'>Create an account to get started.</p>

            </div>
            <div></div>
        </div>
    </div>
  );
};

export default Page;  