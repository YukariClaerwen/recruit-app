'use client';
import Button from "../ui/button";
import { InputFloating } from "../ui/input";
import Link from "next/link";
import GoogleSignInButton from '../GoogleSignInButton';
import {
    FormProvider,
    useForm,
} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginYup, email_inputAttr, pass_inputAttr } from "@/lib/inputValidation";
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast"
import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";

const schema = loginYup.schema

const SignInForm = () => {
    const router = useRouter();
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
    const session = useSession();
    const [user, setUser] = useState({});
    
    const form = useForm({
        mode: 'onChange',
        resolver: yupResolver(schema),
        defaultValues: loginYup.default
    });

    useEffect(() => {
        if(session?.status == 'authenticated') {
            setUser(session?.data.user);
            console.log(session?.data.user)
            if(session?.data.user.role == 'admin') {
                router.push('/admin');
            }
            else if(session?.data.user.role == 'user') {
                router.push('/')
            }
        }
    }, [session])

    const onSubmit = async (values) => {
        // console.log(values);
        setLoading(true)
        const signInData = await signIn('credentials', {
            email: values.email,
            password: values.password,
            redirect: false,
        })
        console.log(signInData)
        if (signInData?.error) {
            setLoading(false)
            toast({
                title: "Lỗi!",
                description: "Email và mật khẩu không chính xác.",
                variant: 'destructive',
            })
        } else if(signInData?.ok) {
            console.log(user)
        }
    }

    return (
        <FormProvider {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                noValidate
                className="dark-form mb-4 w-full"
            >
                <InputFloating {...email_inputAttr} />
                <InputFloating {...pass_inputAttr} />
                <div className="flex justify-between items-center p-2 mb-5">
                    <Link href='/dashboard/resetPassword' className="color-Orange hover:underline">
                        Quên mật khẩu?
                    </Link>

                    <Button type="submit" variant="rounded" disabled={(loading) ? true : false}>
                        {loading ? <Spinner animation="border" size="sm" className="mr-2" /> : <></>}
                        Đăng nhập
                    </Button>
                </div>
                <div className='mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400'>
                    hoặc
                </div>
                <GoogleSignInButton>Đăng nhập với tài khoản Google</GoogleSignInButton>

                <p className='text-center text-sm text-white-600 mt-2'>
                    Vui lòng&nbsp;
                    <Link className='color-Orange hover:underline' href='/sign-up'>
                        Đăng ký
                    </Link>
                    &nbsp;nếu bạn chưa có tài khoản.
                </p>
            </form>
        </FormProvider>
    )
};

export default SignInForm;