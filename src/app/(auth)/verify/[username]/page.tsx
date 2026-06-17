'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import {  useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { verifySchema } from '@/src/schemas/verifySchema';
import * as z from 'zod';
import axios, { Axios, AxiosError } from 'axios';
import { apiResponse } from '@/src/types/ApiResponse';
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';


const VerifyAccount = () => {
    const router = useRouter();
    const param = useParams<{username:string}>();
    const form = useForm<z.infer<typeof verifySchema>>({
        resolver:zodResolver(verifySchema),
        defaultValues:{
         
        }
    })
    

   
const onSubmit = async (data :z.infer<typeof verifySchema>) =>{
    try {
      const response=  await axios.post(`/api/verify-code`,{ 
            username :param.username,
            code: data.verifyCode
        } )

      toast.success(response.data.message);

      router.replace('sign-in')
    } catch (error) {
        console.error("error in signup of user" ,error)
        const axiosError =error as  AxiosError<apiResponse>;
        
        toast.error(
            axiosError.response?.data.message ?? "Signup failed",
            {
                description: axiosError.response?.data.message,
            }
        )
    }

} 
    return (
        <div className='flex justify-center items-center min-h-screen bg-gray-100'>
            <div className='w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md'>
                <div className='text-center'>
                    <h1 className='text-4xl font-extrabold tracking-tight lg:text-5xl mb-6'>Verify Your Account</h1>
                    <p className='mb-4'>Enter the Verification code Sent to Your Email</p>
                    
                </div>
                 <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 "
        >
            <FormField
            name="verifyCode"
            control={form.control}
           
            render={({field})=>(
                <FormItem>Verification Code<FormLabel></FormLabel>
                    <FormControl>
                        <Input placeholder='code'{...field}></Input>
                    </FormControl>
                </FormItem>
            )}>

            </FormField>
        

         

        
         
          <Button 
            type="submit" className="w-full">
                Submit
          
          </Button>
        </form>
      </Form>

            </div>
           
        </div>
    );
};

export default VerifyAccount;