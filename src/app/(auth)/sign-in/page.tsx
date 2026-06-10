'use client';
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { useDebounceValue } from "usehooks-ts";
import { Toaster, toast } from "sonner";
import { useRouter } from "next/navigation";
import { signUpSchema as SignUpSchema } from "@/src/schemas/signUpSchema";

const page = () => {
    const [username, setUsername] = useState('');
    const [usernameMessage, setUsernameMessage] = useState('');
    const [isCheckingUsername, setIsCheckingUsername] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [debouncedUsername] = useDebounceValue(username, 300);
    const router = useRouter();
    const form = useForm<z.infer<typeof SignUpSchema>>({
        resolver: zodResolver(SignUpSchema),
        defaultValues: {
            username: "",
            password: "",
            email: "",
        },
    });

    useEffect(() => {
      let isMounted = true;

      const checkUsernameUnique = async () => {
        if (debouncedUsername.trim() === '') {
          setUsernameMessage('');
          return;
        }

        setIsCheckingUsername(true);
        // TODO: Add actual username uniqueness check here
        if (!isMounted) return;
        setUsernameMessage('');
        setIsCheckingUsername(false);
      };

      checkUsernameUnique();

      return () => {
        isMounted = false;
      };
    }, [debouncedUsername]);

        return(
        <div>Sign Up Page</div>
    )
}
export default page;