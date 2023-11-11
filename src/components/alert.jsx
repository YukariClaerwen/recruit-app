"use client";

import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react'
import { useToast } from './ui/use-toast';

const Alert = () => {
    const { toast } = useToast();
    const router = useRouter();
    const searchParams = useSearchParams();
    const loginState = searchParams.get('login');

    useEffect(() => {
        if (loginState === "success") {
            toast({
                description: "Bạn đã đăng nhập thành công.",
                variant: 'success',
            })
        }
        router.replace("/")
    }, [loginState])

    return (
        <></>
    )
}

export default Alert