'use client';

import { Message } from "@/src/modules/User"
import {useCallback, useEffect, useState } from "react"
import {toast} from "sonner"
import { useSession } from "next-auth/react"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { acceptMessageSchema } from "@/src/schemas/acceptMessageSchema";
import axios, { AxiosError } from "axios";
import { apiResponse } from "@/src/types/ApiResponse";

const Page = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setIsLoading] = useState(false);
  const [isswitchloaded, setIsSwitchloading] = useState(false);
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const handleDeleteMessage = (messageId: string) => {
    setMessages(messages.filter((message) => message._id.toString() !== messageId));
    toast.success("Message deleted successfully");
  };
 

  const { data: session } = useSession();
  const form = useForm({
    resolver: zodResolver(acceptMessageSchema),
    defaultValues: { isAcceptingMessage: false },
  });
  const { register, watch, setValue } = form;
  const acceptMessage = watch("isAcceptingMessage");
  const fetchAcceptMessage = useCallback (async ()=>{
    setIsSwitchloading(false);
    try{
        
         const response = await axios.get<apiResponse>("/api/accept-messages");
       setValue(
  "isAcceptingMessage",
  response.data.isAcceptingMessage ?? false
);
    }catch(error){

      const axiosError = error as AxiosError<apiResponse>;
      toast.error(
        axiosError.response?.data.message ?? "Failed to fetch accept message status",
        {
          description: axiosError.response?.data.message|| "Failed to fetch accept message status",
        }
      );
    }
    finally{
      setIsSwitchloading(true);
    } 
  }, [setValue]);

  const fetchMessages = useCallback(async (refresh: boolean=false) => {
    setIsLoading(true);
    setIsSwitchloading(false);
    try{
      const response = await axios.get<apiResponse>("/api/get-messages");
      setMessages(response.data.messages || []);
      if (refresh) {
        toast.success("Messages refreshed successfully");
      }
    }catch(error){
      
      const axiosError = error as AxiosError<apiResponse>;
      toast.error(
        axiosError.response?.data.message ?? "Failed to fetch accept message status",
        {
          description: axiosError.response?.data.message|| "Failed to fetch accept message status",
        }
      );

    }
     finally{
      setIsLoading(false);
      setIsSwitchloading(false);
    } 
  }, [setIsLoading, setMessages]);

useEffect(() => {
if (!session|| !session.user) return; 
  fetchAcceptMessage();
  fetchMessages();
}, [setValue,session,fetchAcceptMessage, fetchMessages]);
const handleSwitchChange = async () => {
  try{
    const response = await axios.post<apiResponse>("/api/accept-messages", {
      isAcceptingMessage: !acceptMessage,
    });
     setValue('isAcceptingMessage',!acceptMessage);
     toast.success(response.data.message || "Accept message status updated successfully");
  }catch(error){
     const axiosError = error as AxiosError<apiResponse>;
      toast.error(
        axiosError.response?.data.message ?? "Failed to fetch accept message status",
        {
          description: axiosError.response?.data.message|| "Failed to fetch accept message status",
        }
      );

  }
}
   if(!session || !session.user) {
    return
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      please login to access the dashboard.
      </div>} 
      

}

export default Page;

 