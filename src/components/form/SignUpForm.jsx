'use client';
import Button from "../ui/button";
import { InputFloating } from "../ui/input";
import Link from "next/link";
import GoogleSignInButton from "../GoogleSignInButton";
import {
    FormProvider,
    useForm,
} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { registerYup, username_inputAttr, email_inputAttr, pass_inputAttr, cPass_inputAttr} from "@/lib/inputValidation";
import { useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";

const schema = registerYup.schema

const SignUpForm = ({role = ""}) => {
    const router = useRouter();
    const { toast } = useToast();
    const form = useForm({
        mode: 'onChange',
        resolver: yupResolver(schema),
        defaultValues: registerYup.default
    });
    const onSubmit = async (values) => {
        // console.log(values);
        const response = await fetch('/api/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: values.username,
                email: values.email,
                password: values.password,
                role: role
            })
        })

        if(response.ok) {
            router.push('/sign-in')
        } else {
            toast({
                title: "Lỗi!",
                description: "Email và mật khẩu sai.",
                variant: 'destructive',
              })
        }
    }

    return (
        <FormProvider {...form}>
            <form 
                onSubmit={form.handleSubmit(onSubmit)}
                noValidate
                className="dark-form mb-4 w-full"
            >
                <InputFloating {...username_inputAttr} />
                <InputFloating {...email_inputAttr} />
                <InputFloating {...pass_inputAttr} />
                <InputFloating {...cPass_inputAttr} />
                <Button type="submit" variant="rounded" className="w-full">Đăng ký</Button>
                <div className='mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400'>
                    hoặc
                </div>
                <GoogleSignInButton>Đăng ký với tài khoản Google</GoogleSignInButton>
            </form>
        </FormProvider>
    )
};

export default SignUpForm;