'use client';

import { FormProvider, useForm } from "react-hook-form"
import { InputFloating } from "../ui/input"
import { yupResolver } from "@hookform/resolvers/yup";
import { email_inputAttr, resetPassYup } from "@/lib/inputValidation";
import { useState } from "react";
import Button from "../ui/button";
import { Alert, Spinner } from "react-bootstrap";
import { useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";



const ResetPassForm = () => {
    const schema = resetPassYup.schema
    const router = useRouter();
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
    const [hide, setHide] = useState(false);
    const form = useForm({
        mode: 'onChange',
        resolver: yupResolver(schema),
        defaultValues: resetPassYup.default
    });

    const onSubmit = async (values) => {
        console.log(values);
        setLoading(true)

        const response = await fetch('/api/user/reset-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: values.email
            })
        })

        if(response.ok) {
            setHide(true);
            const resData = await response.json()
            toast({
                description: <p dangerouslySetInnerHTML={{ __html: resData.message }} />,
                variant: 'success',
            })
            router.push('/sign-in')
        } else {
            setLoading(false)
            toast({
                title: "Lỗi!",
                description: "Email không tồn tại hoặc không hợp lệ.",
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
                <div className={`${hide ? 'hidden' : ''}`}>
                    <p className="text-center mb-4">Hãy nhập email vào khung bên dưới. Chúng tôi sẽ gởi thông tin để bạn thay đổi mật khẩu vào email.</p>
                    <InputFloating {...email_inputAttr} />

                    <Button type="submit" variant="rounded" className="w-full" disabled={(loading) ? true : false}>
                        {loading ? <Spinner animation="border" size="sm" className="mr-2" /> : <></>}
                        Gửi
                    </Button>
                </div>

                <Alert variant="success" className={`${hide ? '' : 'hidden'}`}>
                    Hướng dẫn để thay đổi mật khẩu đã được gởi đến email của bạn. Vui lòng kiểm tra Email để tạo mật khẩu mới.
                </Alert>

            </form>
        </FormProvider>
    )
}

export default ResetPassForm