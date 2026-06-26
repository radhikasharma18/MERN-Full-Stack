'use client';

import { Message } from "@/src/modules/User"
import {useCallback, useState } from "react"
import {toast} from "sonner"
import { useSession } from "next-auth/react"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { acceptMessageSchema } from "@/src/schemas/acceptMessageSchema";

const Page = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [isswitchloaded, setIsSwitchloaded] = useState(false);
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const handleDeleteMessage = (messageId: string) => {
    setMessages(messages.filter((message) => message._id.toString() !== messageId));
    toast.success("Message deleted successfully");
  };

  const { data: session } = useSession();
  const form = useForm({
    resolver: zodResolver(acceptMessageSchema),
    defaultValues: { isAcceptingMessages: false },
  });
  const { register, watch, setValue } = form;
  const acceptMessage = watch("isAcceptingMessages");
  const fetchAcceptMessage = useCallback (async ()=>{
    setIsSwitchloaded(false);
  }, []);

    return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
        <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-md">
            <div className="text-center">
                <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">
                    Welcome to Mystery Message
                </h1>
                <p className="text-gray-600">
                    Your anonymous adventure starts here. Sign up or log in to begin!
                </p>
            </div>
            <div className="flex justify-center space-x-4">
                <a
                    href="/sign-up"
                    className="bg-black hover:bg-black/50 text-white font-medium py-2 px-4 rounded"
                >
                    Sign Up
                </a>
                <a
                    href="/sign-in"
                    className="bg-black hover:bg-black/50 text-white font-medium py-2 px-4 rounded"
                >
                    Log In
                </a>
            </div>
        </div>
    </div>
  );
}

export default Page;
 