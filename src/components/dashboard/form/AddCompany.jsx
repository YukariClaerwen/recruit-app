'use client';

import Dcard from "@/components/client/ui/card"
import { Form, Spinner } from "react-bootstrap"
import { FormProvider, useForm } from "react-hook-form"
import { FrmInput, FrmSelect } from "./ui"
import { ButtonMain } from "@/components/bs/button"
import { useEffect, useState } from "react"
import { postCompanyYup } from "@/lib/inputValidation";
import { yupResolver } from "@hookform/resolvers/yup";
import { FieldArrayBenefits, FieldArrayLocations } from "./FieldArray";
import Script from "next/script";
import { revalidate } from "@/app/(dashboard)/admin/jobs/action";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import useLocalStorage, { removeLocal } from "./useLocalStorage";


const AddCompany = (props) => {

    const router = useRouter();
    const { toast } = useToast();

    const [loading, setLoading] = useState(false)
    const [checkLoading, setCheckLoading] = useState(false)
    const [checkEmail, setCheckEmail] = useState('Kiểm tra')
    const [variant, setVariant] = useState('outline-secondary')
    const [err, setErr] = useState(undefined)


    const frmYup = postCompanyYup()

    const form = useForm({
        mode: 'onChange',
        resolver: yupResolver(frmYup.schema),
        defaultValues: frmYup.default
    });

    const watchFields = form.watch("email")


    const [values, setValues] = useLocalStorage('frmComp', form.getValues());


    const Industry = values ? values["industry"] : {}
    const CompanySize = values ? values["company_size"] : {}
    const Locations = values ? values["locations"] : []
    const Benefits = values ? values["benefits"] : []


    const [selectedIndustry, setSelectedIndustry] = useState(undefined)
    const [selectedCompanySize, setSelectedCompanySize] = useState(undefined)
    const [selectedLocations, setSelectedLocations] = useState([])
    const [selectedBenefits, setSelectedBenefits] = useState([])

    useEffect(() => {
        setCheckEmail("Kiểm tra")
        setVariant('outline-secondary')
        setCheckLoading(false)
        setErr(undefined)
    }, [watchFields])

    useEffect(() => {
        form.reset({ ...values });
        setSelectedIndustry(Industry)
        setSelectedCompanySize(CompanySize)
        setSelectedLocations(Locations)
        setSelectedBenefits(Benefits)
    }, [form, values ])


    const handleCheck = async () => {
        setCheckLoading(true)

        if (form.getValues('email') == '' || form.getFieldState('email').invalid) {
            setCheckEmail("Email không hợp lệ")
            setVariant('danger')
        } else {
            const response = await fetch('/api/dashboard/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: form.getValues('email')
                })
            })

            const resData = await response.json()
            if (response.ok) {
                setCheckEmail(resData.message)
                setVariant('outline-success')
                setCheckLoading(false)
                setErr(false)
            } else {
                setCheckEmail(resData.message)
                setVariant('outline-danger')
                setCheckLoading(false)
                setErr(true)
            }
        }

    }
    const onSubmit = async (value) => {
        console.log(value)
        setValues(value);

        setLoading(true)
        const res = await fetch('/api/company/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ value })
        })
        // await revalidate();

        if (res.ok) {

            const resData = await res.json()
            toast({
                description: <p dangerouslySetInnerHTML={{ __html: resData.message }} />,
                variant: 'success',
            })
            removeLocal("frmComp")
            setLoading(false);
            router.push('/admin')
        } else {
            setLoading(false);
            const resData = await res.json()
            toast({
                title: "Lỗi!",
                description: <p dangerouslySetInnerHTML={{ __html: resData.message }} />,
                variant: 'destructive',
            })
        }
    }

    return (
        <Dcard title="Thêm nhà tuyển dụng">
            <FormProvider {...form}>
                <Form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="mb-4"><h5>Tài khoản đăng nhập</h5></div>
                    <div className="space-y-6">

                        <FrmInput name="email"
                            label="Email"
                            type="email"
                            placeholder="name@email.com"
                            inputGroup={true} btnText={`${checkEmail}`}
                            variant={variant} onClick={handleCheck} loading={checkLoading} err={err} />

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-4">
                            <FrmInput name="password"
                                label="Mật khẩu"
                                type="password"
                                placeholder="Nhập mật khẩu" />
                            <FrmInput name="cPassword"
                                label="Xác nhận mật khẩu"
                                type="password"
                                placeholder="Nhập lại mật khẩu" />
                        </div>
                    </div>


                    <div className="mt-5 mb-4"><h5>Thông tin công ty</h5></div>
                    <div className="space-y-6">

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-4">
                            <div className="col-span-2">
                                <FrmInput name="company_name"
                                    label="Tên công ty"
                                    type="text"
                                    placeholder="Tên công ty" />
                            </div>
                            <FrmSelect name="company_size"
                                label="Quy mô công ty"
                                control={form.control}
                                selectedValue={selectedCompanySize}
                                options={props.data.size} />
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-4">
                            <FrmSelect name="industry"
                                label="Lĩnh vực công ty"
                                control={form.control}
                                selectedValue={selectedIndustry}
                                options={props.data.industries} />
                            <FrmInput name="nation"
                                label="Quốc gia"
                                type="text"
                                placeholder="Quốc gia" />
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-4">
                            <FrmInput name="contact_person"
                                label="Người liên hệ"
                                type="text"
                                placeholder="Người liên hệ" />
                            <FrmInput name="phone_number"
                                label="Số điện thoại"
                                type="text"
                                placeholder="Số điện thoại" />
                        </div>

                        <FrmInput name="description"
                            label="Giới thiệu công ty"
                            as="textarea"
                            rows={5} />

                        <FieldArrayLocations form={form} name="locations"
                            selectedValue={selectedLocations}
                            options={props.data.locations}
                            label="Địa điểm" />

                        {/* icon scripts */}
                        <Script
                            src="https://unpkg.com/@phosphor-icons/web"
                            strategy="lazyOnload"
                            onLoad={() =>
                                console.log(`script loaded correctly, window.FB has been populated`)
                            }
                        />
                        <FieldArrayBenefits form={form} name="benefits"
                            selectedValue={selectedBenefits}
                            options={props.data.benefits}
                            label="Phúc lợi" />

                    </div>

                    <div className="grid my-5">
                        <ButtonMain type="submit" disabled={(loading) ? true : false}>
                            {loading ? <Spinner animation="border" size="sm" className="mr-2" /> : <></>}
                            {props.editJob ? "Cập nhật" : "Thêm nhà tuyển dụng"}
                        </ButtonMain>
                        {/* <ButtonMain as="a" href="/admin/jobs/draft?" >Xem trước</ButtonMain> */}
                    </div>
                </Form>
            </FormProvider>
        </Dcard >
    )
}

export default AddCompany