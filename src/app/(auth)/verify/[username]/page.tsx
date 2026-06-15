'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';

const VerifyPage = () => {
    const router = useRouter();
    const param = useParams<{username:string}>();

   

    return (
        <div>
            Verify Account Page 
        </div>
    );
};

export default VerifyPage;