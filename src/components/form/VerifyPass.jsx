'use client';

import { FormProvider, useForm } from "react-hook-form"
import { InputFloating } from "../ui/input"
import { yupResolver } from "@hookform/resolvers/yup";
import { cPass_inputAttr, pass_inputAttr, verifyPassYup } from "@/lib/inputValidation";
import { useState } from "react";
import Button from "../ui/button";
import { Spinner } from "react-bootstrap";
import { useToast } from "../ui/use-toast";

const VerifyPass = () => {
    const schema = verifyPassYup.schema
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
    const [hide, setHide] = useState(false);
    const form = useForm({
        mode: 'onChange',
        resolver: yupResolver(schema),
        defaultValues: verifyPassYup.default
    });

    const onSubmit = async (values) => {
        console.log(values);
        setLoading(true);
        const currentUrl = window.location.href;
        const resetToken = currentUrl.split('/').pop();
        console.log(resetToken);
        try {
            const response = await fetch(`/api/user/reset-password/${resetToken}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    password: values.password,
                }),
            });

            if (response.ok) {
                setHide(true);
                const resData = await response.json();
                toast({
                    description: <p dangerouslySetInnerHTML={{ __html: resData.message }} />,
                    variant: 'success',
                });
            } else {
                setLoading(false);
                const errorData = await response.json();
                toast({
                    title: "Lỗi!",
                    description: errorData.message || "Có lỗi xảy ra khi đặt lại mật khẩu.",
                    variant: 'destructive',
                });
            }
        } catch (error) {
            console.error('Error during API request:', error);
            setLoading(false);
            toast({
                title: "Lỗi!",
                description: "Có lỗi xảy ra khi đặt lại mật khẩu.",
                variant: 'destructive',
            });
        }
    };
    return (
        <FormProvider {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                noValidate
                className="dark-form mb-4 w-full"
            >
                <div>
                    {/* <p className="text-center mb-4">Hãy nhập lại email và mật khẩu mới để xác nhận thay đổi mật khẩu</p> */}
                    <p className="text-center mb-4">Hãy nhập mật khẩu mới để xác nhận đổi mật khẩu</p>
                    {/* <InputFloating {...email_inputAttr} /> */}
                    <InputFloating {...pass_inputAttr} />
                    <InputFloating {...cPass_inputAttr} />

                    <Button type="submit" variant="rounded" className="w-full" disabled={(loading) ? true : false}>
                        {loading ? <Spinner animation="border" size="sm" className="mr-2" /> : <></>}
                        Thay đổi mật khẩu
                    </Button>
                </div>

            </form>
            
        </FormProvider>
    )
}

export default VerifyPass