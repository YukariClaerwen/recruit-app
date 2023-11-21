'use client';

import Dcard from "@/components/client/ui/card"
import { Form, FormControl, FormGroup, FormLabel, Spinner } from "react-bootstrap"
import { FormProvider, useForm } from "react-hook-form"
import { FrmInput, FrmSelect } from "./ui"
import { ButtonMain, ButtonSub } from "@/components/bs/button"
import { useEffect, useRef, useState } from "react"
import { file_validate, postCompanyYup } from "@/lib/inputValidation";
import { yupResolver } from "@hookform/resolvers/yup";
import { FieldArrayBenefits, FieldArrayLocations } from "./FieldArray";
import Script from "next/script";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import useLocalStorage, { removeLocal } from "./useLocalStorage";
import AvatarUploadPage from "@/app/avatar/upload/page";
import Image from "next/image";
import { CloudArrowUp, WarningCircle } from "@phosphor-icons/react/dist/ssr";


const AddCompany = (props) => {

    const router = useRouter();
    const { toast } = useToast();

    const inputLogoRef = useRef(null);
    const previewLogo = useRef(null);
    const inputCoverRef = useRef(null);
    const previewCover = useRef(null);

    const [blobLogo, setBlobLogo] = useState(null);
    const [uploadingLogo, setUploadingLogo] = useState(false);
    const [blobCover, setBlobCover] = useState(null);
    const [uploadingCover, setUploadingCover] = useState(false);

    const [loading, setLoading] = useState(false)
    const [checkLoading, setCheckLoading] = useState(false)
    const [checkEmail, setCheckEmail] = useState('Kiểm tra')
    const [variant, setVariant] = useState('outline-secondary')
    const [err, setErr] = useState(undefined)



    const frmYup = postCompanyYup(props.edit)
    const company = props.edit;


    const form = useForm({
        mode: 'onChange',
        resolver: yupResolver(frmYup.schema),
        defaultValues: frmYup.default,
        // shouldUnregister: true,
    });
    let watchFields
    if(!props.edit) {
        watchFields = form.watch("email")
    }

    const [values, setValues] = useLocalStorage('frmComp', form.getValues());

    const Industry = values ? values["industry"] : {}
    const CompanySize = values ? values["company_size"] : {}
    const Locations = values ? values["locations"] : []
    const Benefits = values ? values["benefits"] : []
    const Logo = values ? values["logo"] : null;
    const Cover = values ? values["cover"] : null;


    const [selectedIndustry, setSelectedIndustry] = useState(undefined)
    const [selectedCompanySize, setSelectedCompanySize] = useState(undefined)
    const [selectedLocations, setSelectedLocations] = useState([])
    const [selectedBenefits, setSelectedBenefits] = useState([])
    const [selectedLogo, setSelectedLogo] = useState(null)
    const [selectedCover, setSelectedCover] = useState(null)

    const [oldImg, setOldImg] = useState(null);
    const [title, setTitle] = useState("Tạo nhà tuyển dụng");

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
        setSelectedLogo(Logo)
        setSelectedCover(Cover)
    }, [form, values])

    useEffect(() => {
        if (company) {
            setOldImg({
                logo: company.logo,
                cover: company.cover,
            })
            setSelectedCover(company.cover)
            setSelectedLogo(company.logo)

        }
    }, [])

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
    const [errorMsgLogo, setErrorMsgLogo] = useState(false);
    const [isSuccessLogo, setIsSuccessLogo] = useState(false);
    const [isPreviewLogo, setIsPreviewLogo] = useState(false);
    const [isUploadedLogo, setIsUploadedLogo] = useState(false);

    const [errorMsgCover, setErrorMsgCover] = useState(false);
    const [isSuccessCover, setIsSuccessCover] = useState(false);
    const [isPreviewCover, setIsPreviewCover] = useState(false);
    const [isUploadedCover, setIsUploadedCover] = useState(false);

    //previewimages and validate image
    const verifyImg = async (e, ref, previewRef, blob, setBlob, err, success, preview, uploaded) => {
        const file = ref.current.files[0];
        const result = file_validate(file, "image")
        if (result.status) {
            previewRef.current.src = URL.createObjectURL(e.target.files[0]);

            previewRef.current.onload = function () {
                // console.log(previewRef.current.src)
                URL.revokeObjectURL(previewRef.current.src) // free memory
            }

            preview(true)
            uploaded(false)
        }
        if (blob) {
            const response = await fetch(
                `/api/file/delete?url=${blob.url}`,
                {
                    method: 'DELETE'
                },
            );
            // console.log(response)
            setBlob(null)
        }
        err(result.message)
        success(result.status)
    }

    const uploadImg = async (event, setUploading, ref, setBlob, setPreview, setSuccess, setSelected, type) => {
        event.preventDefault();
        setUploading(true);

        const file = ref.current.files[0];

        const response = await fetch(
            `/api/file/upload?filename=${type}/${file.name}`,
            {
                method: 'POST',
                body: file,
            },
        );

        if (response.ok) {
            const newBlob = (await response.json());
            setBlob(await newBlob);
            setPreview(false);
            setUploading(false);
            setSuccess(false);
            setSelected(false);
        }

    }


    const onSubmit = async (value) => {
        // console.log(value)

        if (isSuccessLogo || isSuccessCover) {
            toast({
                title: "Lỗi!",
                description: <p>Vui lòng upload hình ảnh đã chọn trước!</p>,
                variant: 'destructive',
            })
            return null;
        }
        const data = {
            ...value,
            logo: blobLogo?.url ? blobLogo.url : selectedLogo,
            cover: blobCover?.url ? blobCover.url : selectedCover,
        }

        setValues(data);
        setLoading(true)
        let res;
        if (!props.edit) {
            res = await fetch('/api/company/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ value: data })
            })
        } else {
            res = await fetch('/api/company/', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    value: {
                        company_id: props.edit.id,
                        ...data
                    }
                })
            })
        }

        if (res.ok) {

            const resData = await res.json()
            toast({
                description: <p dangerouslySetInnerHTML={{ __html: resData.message }} />,
                variant: 'success',
            })
            removeLocal("frmComp")
            setLoading(false);
            if (!props.edit) {
                router.push(`/companies/${resData.data.nha_tuyen_dung.nha_tuyen_dung_id}`)
            } else {
                router.push(`/companies/${props.edit.id}`)
            }
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
        <Dcard title={title}>
            <FormProvider {...form}>
                <Form onSubmit={form.handleSubmit(onSubmit)}>
                    {
                        !props.edit ?
                            <div className={`${props.edit ? 'hidden' : ''}`}>
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
                            </div> 
                            : <></>
                    }

                    <div className={`${!props.edit ? 'mt-5' : ''} mb-4`}><h5>Thông tin công ty</h5></div>

                    <div className="space-y-6">
                        <div>
                            <FormGroup controlId="cover" className="mb-3">
                                <FormLabel className="bg-gray-50 hover:bg-gray-200 border-dotted border-2 rounded w-full h-[10rem] relative flex justify-center items-center overflow-hidden">
                                    <div className={` flex justify-center items-center flex-col gap-2 ${isPreviewCover || isUploadedCover || selectedCover ? "hidden" : ""}`}>
                                        <CloudArrowUp size={32} weight="thin" />
                                        <p>Tải cover</p>
                                        <p>Dung lượng tối đa: 5MB</p>
                                    </div>
                                    <img src={`${selectedCover ? selectedCover : "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnN2Z2pzPSJodHRwOi8vc3ZnanMuZGV2L3N2Z2pzIiB2aWV3Qm94PSIwIDAgODAwIDgwMCIgb3BhY2l0eT0iMSI+PGRlZnM+PGZpbHRlciBpZD0iYmJibHVycnktZmlsdGVyIiB4PSItMTAwJSIgeT0iLTEwMCUiIHdpZHRoPSI0MDAlIiBoZWlnaHQ9IjQwMCUiIGZpbHRlclVuaXRzPSJvYmplY3RCb3VuZGluZ0JveCIgcHJpbWl0aXZlVW5pdHM9InVzZXJTcGFjZU9uVXNlIiBjb2xvci1pbnRlcnBvbGF0aW9uLWZpbHRlcnM9InNSR0IiPgoJPGZlR2F1c3NpYW5CbHVyIHN0ZERldmlhdGlvbj0iMTE3IiB4PSIwJSIgeT0iMCUiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGluPSJTb3VyY2VHcmFwaGljIiBlZGdlTW9kZT0ibm9uZSIgcmVzdWx0PSJibHVyIj48L2ZlR2F1c3NpYW5CbHVyPjwvZmlsdGVyPjwvZGVmcz48ZyBmaWx0ZXI9InVybCgjYmJibHVycnktZmlsdGVyKSI+PGVsbGlwc2Ugcng9IjI3Ny41IiByeT0iMjc3LjUiIGN4PSIyMTkuNzc3MTE4MDAwOTY5ODQiIGN5PSI1MjQuMTk3OTI5NDM2ODgwNiIgZmlsbD0iaHNsYSgwLCAwJSwgODUlLCAxLjAwKSI+PC9lbGxpcHNlPjxlbGxpcHNlIHJ4PSIyNzcuNSIgcnk9IjI3Ny41IiBjeD0iMzc3LjE1MzExMDAyNDg3ODc0IiBjeT0iNjcuMjY1NjcxMDI1NzQwNjkiIGZpbGw9ImhzbGEoMCwgMCUsIDYyJSwgMS4wMCkiPjwvZWxsaXBzZT48ZWxsaXBzZSByeD0iMjc3LjUiIHJ5PSIyNzcuNSIgY3g9IjY3Mi42OTYzNjA1NTU5MjY3IiBjeT0iNTYyLjE3MjIzMDc1MjY2NyIgZmlsbD0iaHNsYSgwLCAwJSwgNjAlLCAxLjAwKSI+PC9lbGxpcHNlPjxlbGxpcHNlIHJ4PSIyNzcuNSIgcnk9IjI3Ny41IiBjeD0iNDY5Ljg2MDY5MDkwMzAxNzU0IiBjeT0iMjQ4LjY1NTMyMzY1NTg5OTYyIiBmaWxsPSJoc2xhKDAsIDAlLCAxMDAlLCAxLjAwKSI+PC9lbGxpcHNlPjwvZz48L3N2Zz4="}`}
                                        alt="previewImage" className={`object-cover  ${(isPreviewCover || selectedCover) ? "" : "hidden"}`} ref={previewCover} />
                                    {blobCover && (
                                        <Image src={blobCover.url} alt="upload file"
                                            fill={true}
                                            sizes="(max-width: 100%) 100vw,(max-height: 10rem) 100vw"
                                            objectFit="cover"
                                            objectPosition="center center"
                                            onLoadingComplete={(img) => { setIsUploadedCover(true) }}
                                            placeholder="blur"
                                            loading="lazy"
                                            blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnN2Z2pzPSJodHRwOi8vc3ZnanMuZGV2L3N2Z2pzIiB2aWV3Qm94PSIwIDAgODAwIDgwMCIgb3BhY2l0eT0iMSI+PGRlZnM+PGZpbHRlciBpZD0iYmJibHVycnktZmlsdGVyIiB4PSItMTAwJSIgeT0iLTEwMCUiIHdpZHRoPSI0MDAlIiBoZWlnaHQ9IjQwMCUiIGZpbHRlclVuaXRzPSJvYmplY3RCb3VuZGluZ0JveCIgcHJpbWl0aXZlVW5pdHM9InVzZXJTcGFjZU9uVXNlIiBjb2xvci1pbnRlcnBvbGF0aW9uLWZpbHRlcnM9InNSR0IiPgoJPGZlR2F1c3NpYW5CbHVyIHN0ZERldmlhdGlvbj0iMTE3IiB4PSIwJSIgeT0iMCUiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGluPSJTb3VyY2VHcmFwaGljIiBlZGdlTW9kZT0ibm9uZSIgcmVzdWx0PSJibHVyIj48L2ZlR2F1c3NpYW5CbHVyPjwvZmlsdGVyPjwvZGVmcz48ZyBmaWx0ZXI9InVybCgjYmJibHVycnktZmlsdGVyKSI+PGVsbGlwc2Ugcng9IjI3Ny41IiByeT0iMjc3LjUiIGN4PSIyMTkuNzc3MTE4MDAwOTY5ODQiIGN5PSI1MjQuMTk3OTI5NDM2ODgwNiIgZmlsbD0iaHNsYSgwLCAwJSwgODUlLCAxLjAwKSI+PC9lbGxpcHNlPjxlbGxpcHNlIHJ4PSIyNzcuNSIgcnk9IjI3Ny41IiBjeD0iMzc3LjE1MzExMDAyNDg3ODc0IiBjeT0iNjcuMjY1NjcxMDI1NzQwNjkiIGZpbGw9ImhzbGEoMCwgMCUsIDYyJSwgMS4wMCkiPjwvZWxsaXBzZT48ZWxsaXBzZSByeD0iMjc3LjUiIHJ5PSIyNzcuNSIgY3g9IjY3Mi42OTYzNjA1NTU5MjY3IiBjeT0iNTYyLjE3MjIzMDc1MjY2NyIgZmlsbD0iaHNsYSgwLCAwJSwgNjAlLCAxLjAwKSI+PC9lbGxpcHNlPjxlbGxpcHNlIHJ4PSIyNzcuNSIgcnk9IjI3Ny41IiBjeD0iNDY5Ljg2MDY5MDkwMzAxNzU0IiBjeT0iMjQ4LjY1NTMyMzY1NTg5OTYyIiBmaWxsPSJoc2xhKDAsIDAlLCAxMDAlLCAxLjAwKSI+PC9lbGxpcHNlPjwvZz48L3N2Zz4=" />
                                    )}
                                </FormLabel>
                                <FormControl
                                    className="hidden"
                                    type="file" name="logo" ref={inputCoverRef}
                                    onChange={(e) => { verifyImg(e, inputCoverRef, previewCover, blobCover, setBlobCover, setErrorMsgCover, setIsSuccessCover, setIsPreviewCover, setIsUploadedCover) }} />
                            </FormGroup>
                            <div>
                                <ButtonSub type="button"
                                    onClick={(e) => { uploadImg(e, setUploadingCover, inputCoverRef, setBlobCover, setIsPreviewCover, setIsSuccessCover, setSelectedCover, "cover") }}
                                    className="w-full" disabled={(uploadingCover || !isSuccessCover) ? true : false}>
                                    {uploadingCover ? <><Spinner animation="border" size="sm" className="mr-2" /> Uploading...</> : <>Upload</>}

                                </ButtonSub>

                                {errorMsgCover ? <p className="text-danger bg-white/75 rounded-md py-1.5 px-2.5 font-bold text-sm inline-block">
                                    <WarningCircle className="inline-block align-top mr-2" size="20" />
                                    {errorMsgCover}
                                </p> : null}
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="lg:w-1/3 w-full">
                                <FormGroup controlId="logo" className="mb-3">
                                    <FormLabel className="bg-gray-50 hover:bg-gray-200 border-dotted border-2 rounded w-full h-[16rem] relative flex justify-center items-center">
                                        <div className={` flex justify-center items-center flex-col gap-2 ${isPreviewLogo || isUploadedLogo || selectedLogo ? "hidden" : ""}`}>
                                            <CloudArrowUp size={32} weight="thin" />
                                            <p>Tải logo</p>
                                            <p>Dung lượng tối đa: 5MB</p>
                                        </div>
                                        <img src={`${selectedLogo ? selectedLogo : "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnN2Z2pzPSJodHRwOi8vc3ZnanMuZGV2L3N2Z2pzIiB2aWV3Qm94PSIwIDAgODAwIDgwMCIgb3BhY2l0eT0iMSI+PGRlZnM+PGZpbHRlciBpZD0iYmJibHVycnktZmlsdGVyIiB4PSItMTAwJSIgeT0iLTEwMCUiIHdpZHRoPSI0MDAlIiBoZWlnaHQ9IjQwMCUiIGZpbHRlclVuaXRzPSJvYmplY3RCb3VuZGluZ0JveCIgcHJpbWl0aXZlVW5pdHM9InVzZXJTcGFjZU9uVXNlIiBjb2xvci1pbnRlcnBvbGF0aW9uLWZpbHRlcnM9InNSR0IiPgoJPGZlR2F1c3NpYW5CbHVyIHN0ZERldmlhdGlvbj0iMTE3IiB4PSIwJSIgeT0iMCUiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGluPSJTb3VyY2VHcmFwaGljIiBlZGdlTW9kZT0ibm9uZSIgcmVzdWx0PSJibHVyIj48L2ZlR2F1c3NpYW5CbHVyPjwvZmlsdGVyPjwvZGVmcz48ZyBmaWx0ZXI9InVybCgjYmJibHVycnktZmlsdGVyKSI+PGVsbGlwc2Ugcng9IjI3Ny41IiByeT0iMjc3LjUiIGN4PSIyMTkuNzc3MTE4MDAwOTY5ODQiIGN5PSI1MjQuMTk3OTI5NDM2ODgwNiIgZmlsbD0iaHNsYSgwLCAwJSwgODUlLCAxLjAwKSI+PC9lbGxpcHNlPjxlbGxpcHNlIHJ4PSIyNzcuNSIgcnk9IjI3Ny41IiBjeD0iMzc3LjE1MzExMDAyNDg3ODc0IiBjeT0iNjcuMjY1NjcxMDI1NzQwNjkiIGZpbGw9ImhzbGEoMCwgMCUsIDYyJSwgMS4wMCkiPjwvZWxsaXBzZT48ZWxsaXBzZSByeD0iMjc3LjUiIHJ5PSIyNzcuNSIgY3g9IjY3Mi42OTYzNjA1NTU5MjY3IiBjeT0iNTYyLjE3MjIzMDc1MjY2NyIgZmlsbD0iaHNsYSgwLCAwJSwgNjAlLCAxLjAwKSI+PC9lbGxpcHNlPjxlbGxpcHNlIHJ4PSIyNzcuNSIgcnk9IjI3Ny41IiBjeD0iNDY5Ljg2MDY5MDkwMzAxNzU0IiBjeT0iMjQ4LjY1NTMyMzY1NTg5OTYyIiBmaWxsPSJoc2xhKDAsIDAlLCAxMDAlLCAxLjAwKSI+PC9lbGxpcHNlPjwvZz48L3N2Zz4="}`}
                                            alt="previewImage" className={`object-contain h-[16rem] ${(isPreviewLogo || selectedLogo) ? "" : "hidden"}`} ref={previewLogo} />
                                        {blobLogo && (
                                            <Image src={blobLogo.url} alt="upload file"
                                                fill={true}
                                                sizes="(max-width: 20rem) 100vw,(max-height: 20rem) 100vw"
                                                objectFit="contain"
                                                objectPosition="center center"
                                                onLoadingComplete={(img) => { setIsUploadedLogo(true) }}
                                                placeholder="blur"
                                                loading="lazy"
                                                blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnN2Z2pzPSJodHRwOi8vc3ZnanMuZGV2L3N2Z2pzIiB2aWV3Qm94PSIwIDAgODAwIDgwMCIgb3BhY2l0eT0iMSI+PGRlZnM+PGZpbHRlciBpZD0iYmJibHVycnktZmlsdGVyIiB4PSItMTAwJSIgeT0iLTEwMCUiIHdpZHRoPSI0MDAlIiBoZWlnaHQ9IjQwMCUiIGZpbHRlclVuaXRzPSJvYmplY3RCb3VuZGluZ0JveCIgcHJpbWl0aXZlVW5pdHM9InVzZXJTcGFjZU9uVXNlIiBjb2xvci1pbnRlcnBvbGF0aW9uLWZpbHRlcnM9InNSR0IiPgoJPGZlR2F1c3NpYW5CbHVyIHN0ZERldmlhdGlvbj0iMTE3IiB4PSIwJSIgeT0iMCUiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGluPSJTb3VyY2VHcmFwaGljIiBlZGdlTW9kZT0ibm9uZSIgcmVzdWx0PSJibHVyIj48L2ZlR2F1c3NpYW5CbHVyPjwvZmlsdGVyPjwvZGVmcz48ZyBmaWx0ZXI9InVybCgjYmJibHVycnktZmlsdGVyKSI+PGVsbGlwc2Ugcng9IjI3Ny41IiByeT0iMjc3LjUiIGN4PSIyMTkuNzc3MTE4MDAwOTY5ODQiIGN5PSI1MjQuMTk3OTI5NDM2ODgwNiIgZmlsbD0iaHNsYSgwLCAwJSwgODUlLCAxLjAwKSI+PC9lbGxpcHNlPjxlbGxpcHNlIHJ4PSIyNzcuNSIgcnk9IjI3Ny41IiBjeD0iMzc3LjE1MzExMDAyNDg3ODc0IiBjeT0iNjcuMjY1NjcxMDI1NzQwNjkiIGZpbGw9ImhzbGEoMCwgMCUsIDYyJSwgMS4wMCkiPjwvZWxsaXBzZT48ZWxsaXBzZSByeD0iMjc3LjUiIHJ5PSIyNzcuNSIgY3g9IjY3Mi42OTYzNjA1NTU5MjY3IiBjeT0iNTYyLjE3MjIzMDc1MjY2NyIgZmlsbD0iaHNsYSgwLCAwJSwgNjAlLCAxLjAwKSI+PC9lbGxpcHNlPjxlbGxpcHNlIHJ4PSIyNzcuNSIgcnk9IjI3Ny41IiBjeD0iNDY5Ljg2MDY5MDkwMzAxNzU0IiBjeT0iMjQ4LjY1NTMyMzY1NTg5OTYyIiBmaWxsPSJoc2xhKDAsIDAlLCAxMDAlLCAxLjAwKSI+PC9lbGxpcHNlPjwvZz48L3N2Zz4=" />
                                        )}
                                    </FormLabel>
                                    <FormControl
                                        className="hidden" type="file"
                                        name="logo" ref={inputLogoRef}
                                        onChange={(e) => { verifyImg(e, inputLogoRef, previewLogo, blobLogo, setBlobLogo, setErrorMsgLogo, setIsSuccessLogo, setIsPreviewLogo, setIsUploadedLogo) }} />
                                </FormGroup>
                                <div>
                                    <ButtonSub
                                        type="button"
                                        onClick={(e) => { uploadImg(e, setUploadingLogo, inputLogoRef, setBlobLogo, setIsPreviewLogo, setIsSuccessLogo, setSelectedLogo, "logo") }}
                                        className="w-full" disabled={(uploadingLogo || !isSuccessLogo) ? true : false}>
                                        {uploadingLogo ? <><Spinner animation="border" size="sm" className="mr-2" /> Uploading...</> : <>Upload</>}

                                    </ButtonSub>

                                    {errorMsgLogo ? <p className="text-danger bg-white/75 rounded-md py-1.5 px-2.5 font-bold text-sm inline-block">
                                        <WarningCircle className="inline-block align-top mr-2" size="20" />
                                        {errorMsgLogo}
                                    </p> : null}
                                </div>
                            </div>
                            <div className="w-full lg:w-2/3 space-y-6">
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
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-4">

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
                            {props.edit ? "Cập nhật" : "Thêm nhà tuyển dụng"}
                        </ButtonMain>
                        {/* <ButtonMain as="a" href="/admin/jobs/draft?" >Xem trước</ButtonMain> */}
                    </div>
                </Form>
            </FormProvider>
        </Dcard >
    )
}

export default AddCompany