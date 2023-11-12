'use client';

import { FormProvider, useForm } from "react-hook-form"
import { InputFloating } from "../ui/input"
import { yupResolver } from "@hookform/resolvers/yup";
import { cPass_inputAttr, email_inputAttr, pass_inputAttr, resetPassYup, verifyPassYup } from "@/lib/inputValidation";
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

        const error = false

        if (!error) {
            setLoading(false)
            toast({
                title: "Lỗi!",
                description: "Email không tồn tại hoặc không hợp lệ.",
                variant: 'destructive',
            })
        } else if (error) {
            setHide(true);
            // console.log(user)
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


export const VerifyPass = () => {
    const schema = verifyPassYup.schema
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
    const form = useForm({
        mode: 'onChange',
        resolver: yupResolver(schema),
        defaultValues: verifyPassYup.default
    });

    const onSubmit = async (values) => {
        console.log(values);
        setLoading(true)

        const error = false

        if (!error) {
            setLoading(false)
            toast({
                title: "Lỗi!",
                description: "Email không tồn tại hoặc không hợp lệ.",
                variant: 'destructive',
            })
        } else if (error) {
            setHide(true);
            // console.log(user)
        }
    }
    return (
        <FormProvider {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                noValidate
                className="dark-form mb-4 w-full"
            >
                <div>
                    <p className="text-center mb-4">Hãy nhập lại email và mật khẩu mới để xác nhận thay đổi mật khẩu</p>
                    <InputFloating {...email_inputAttr} />
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