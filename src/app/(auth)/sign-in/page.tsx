'use client';
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import link from "next/link";
import { useState } from "react";
import {useDebounceValue} from "usehooks-ts";
export { Toaster, toast } from "sonner"


const page = () =>{

    const[username, setUsername] = useState('');
    const[usenameMessage, setUsernameMessage] = useState('');
    const[isCheckingUsername, setIsCheckingUsername] = useState(false);
    const[isSubmitting, setIsSubmitting] = useState(false);

    const debouncedUsername = useDebounceValue(username, 500); 



    return(<div>Sign In Page</div>)
}
export default page;