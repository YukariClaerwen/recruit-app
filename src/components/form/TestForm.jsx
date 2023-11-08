'use client'
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import yup from '@/lib/yupGlobal'

import { InputFloating } from "@/components/ui/input";

const formSchema = yup
    .object()
    .shape({
        username: yup.string().required('Required').email('Email invalid'),
        password: yup.string().required('Required').password('Password invalid')
    })
    .required();

const TestForm = () => {
    const form = useForm({
        mode: 'onChange',
        resolver: yupResolver(formSchema),
        defaultValues: {
            username: '',
            password: '',
        }
    });
    const onSubmit = (data) => {
        console.log(data)
    }
    return (
        <FormProvider {...form}>
            <form className="box" onSubmit={form.handleSubmit(onSubmit)}>
                <InputFloating label="Email" type="email" name="username" id="username" placeholder="name@example.com" />
                <InputFloating label="Mật khẩu" type="password" name="password" id="password" placeholder="Hãy nhập mật khẩu" />

                <button type="submit" id="submit" className="btn btn-primary">LOGIN</button>
            </form>
        </FormProvider>
    )
}
export default TestForm