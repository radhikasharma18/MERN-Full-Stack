'use client';

import { Message, User } from "@/src/modules/User"
import {useCallback, useEffect, useState } from "react"
import {toast} from "sonner"
import { useSession } from "next-auth/react"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { acceptMessageSchema } from "@/src/schemas/acceptMessageSchema";
import axios, { AxiosError } from "axios";
import { apiResponse } from "@/src/types/ApiResponse";
import { useCopyToClipboard } from "usehooks-ts";
import MessageCard from "@/src/components/MessageCard";
import { Loader2, RefreshCcw } from "lucide-react";
import { Separator } from "@/src/components/ui/separator";
import { Switch } from "@/src/components/ui/switch";
import { Button } from "@/src/components/ui/button";

const Page = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isswitchloaded, setIsSwitchloading] = useState(false);
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const handleDeleteMessage = (messageId: string) => {
    setMessages(messages.filter((message) => message._id.toString() !== messageId));
    toast.success("Message deleted successfully");
  };
 

  const { data: session } = useSession();
  const [, copyToClipboard] = useCopyToClipboard();
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


const username = session?.user?.username ?? "";

 const baseUrl = `${window.location.protocol}//${window.location.host}`;
 const profileLink = `${baseUrl}/u/${username}`;
 const handleCopyLink=() => {
  navigator.clipboard.writeText(profileLink);
  copyToClipboard(profileLink);
  toast.success("Link copied to clipboard");
}

if(!session || !session.user) {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <p>please login to access the dashboard.</p>
    </div>
  );
}

return (
  <div className="flex flex-col gap-4 p-4">
    <h2 className="text-lg font-semibold">Copy your unique link</h2>
    <div className="flex items-center gap-2">
      <input
        type="text"
        value={profileLink}
        readOnly
        className="input input-border px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
     <Button
     type="button"
     variant="default"
      onClick={handleCopyLink}
     >
  Copy
</Button>
      
      
      <div className="flex items-center gap-2">
        <Switch
          {...register("isAcceptingMessage")}
          checked={acceptMessage}
          onCheckedChange={handleSwitchChange}
          disabled={!isswitchloaded}
         
        />
        <span className="text-sm text-muted-foreground">
          Accepting Messages: {acceptMessage ? "Accepting Messages" : "Not Accepting Messages"}
        </span>
      </div>
    </div>
    <Separator/>
    <Button className="mt-4"
      value={acceptMessage ? "Stop Accepting Messages" : "Start Accepting Messages"}
      onClick={(e)=>{
        e.preventDefault();
        fetchMessages();
      }}
    >
      {isLoading ? (
        <Loader2 className="loading loading-spinner loading-sm"/>
      ) : (
        <RefreshCcw className="cursor-pointer" onClick={() => fetchMessages(true)} />
      )}

    </Button>
   <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
  {messages.length > 0 ? (
    messages.map((message, index) => {
      const messageWithStringId = {

        ...message,
        _id: message._id.toString(),
      };

      return (
        <MessageCard
          key={messageWithStringId._id}
          message={messageWithStringId}
          onDelete={() => handleDeleteMessage(messageWithStringId._id)}
        />
      );
    })
  ) : (
    <p>No messages found.</p>
  )}
</div>
  </div>
);
}

export default Page;

 