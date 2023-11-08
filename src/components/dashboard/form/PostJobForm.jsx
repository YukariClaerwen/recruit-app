"use client";

import { ButtonMain } from "@/components/bs/button";
import Dcard from "@/components/client/ui/card";
import { useEffect, useState } from "react";
import { Form, FormCheck, FormControl, FormGroup, FormLabel, FormText } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import Select from 'react-select'
import useLocalStorage, { removeLocal } from "./useLocalStorage";
import { FrmSelect, FrmInput, FrmCreate, FormatNumber, FrmFormatNumber } from "./ui";
import { yupResolver } from "@hookform/resolvers/yup";
import { postJobYup } from "@/lib/inputValidation";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { useSession } from "next-auth/react";
import { revalidate } from "@/app/(dashboard)/admin/jobs/action";
// import * as yup from "yup";


const PostJobForm = ({ data, ...props }) => {
  const router = useRouter();
  const { toast } = useToast();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const salaryCurrency = [
    { value: "1", label: "VND" },
    { value: "2", label: "USD" }
  ]
  const frmYup = postJobYup()

  const form = useForm({
    mode: 'onChange',
    resolver: yupResolver(frmYup.schema),
    defaultValues: frmYup.default
  });
  const [values, setValues] = useLocalStorage('frmJob', form.getValues());

  //get selected options from localStorate
  const JobLevel = values ? values["frmJobLevel"] : {}
  const JobMajor = values ? values["frmJobMajor"] : {}
  const JobIndustry = values ? values["frmJobCompField"] : {}
  const JobLocations = values ? values["frmJobLocation"] : []
  const JobSalaryCurrency = values ? values["frmJobSalaryCurrency"] : {}
  const JobTags = values ? values["frmJobTags"] : []
  const JobCVLanguage = values ? values["frmJobCVLanguage"] : []
  const JobCompany = values ? values["frmJobCompany"] : []

  //set state for selected options
  const [selectedLevel, setSelectedLevel] = useState(undefined)
  const [selectedMajor, setSelectedMajor] = useState(undefined)
  const [selectedIndustry, setSelectedIndustry] = useState(undefined)
  const [selectedLocation, setSelectedLocation] = useState([])
  const [selectedCurrency, setSelectedCurrency] = useState(undefined)
  const [tags, setTags] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState(undefined)
  const [selectedCompany, setSelectedCompany] = useState(undefined)


  const fetchData = async () => {
    setSelectedLevel(JobLevel)
    setSelectedMajor(JobMajor)
    setSelectedIndustry(JobIndustry)
    setSelectedLocation(JobLocations)
    setSelectedCurrency(JobSalaryCurrency)
    setTags(JobTags)
    setSelectedLanguage(JobCVLanguage)
    setSelectedCompany(JobCompany)
  };
  useEffect(() => {
    form.reset({ ...values });
    fetchData();
  }, [form])

  // console.log(form.getValues())
  const onSubmit = async (value) => {
    setLoading(true)
    setValues(value);

    const res = await fetch('/api/dashboard/job', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        frmJob: value,
        frmUser: { email: session.user.email }
      })
    })

    await revalidate();

    if (res.ok) {
      toast({
        description: "Đăng việc làm thành công",
      })
      removeLocal("frmJob")
      setLoading(false);
      router.push('/admin/jobs')
    } else {
      setLoading(false);
      toast({
        title: "Lỗi!",
        description: "Có lỗi xảy ra, không thể đăng việc làm.",
        variant: 'destructive',
      })
    }
  }

  return (
    <Dcard title="Đăng việc làm">
      <FormProvider {...form}>
        <Form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="mb-4"><h5>Mô tả công việc</h5></div>
          <div>
            <FrmInput name="frmJobTitle"
              label="Chức danh"
              type="text"
              placeholder="VD: Nhân viên tư vấn tuyển dụng" />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-4">
              <FrmSelect name="frmJobLevel"
                label="Cấp bậc"
                control={form.control}
                selectedValue={selectedLevel}
                options={data.levels} />
              <FrmInput name="frmJobType"
                label="Loại hình công việc"
                type="text"
                placeholder="VD: Toàn thời gian" />
              <FrmSelect name="frmJobMajor"
                label="Ngành nghề"
                control={form.control}
                selectedValue={selectedMajor}
                options={data.majors} />
              <FrmSelect name="frmJobCompField"
                label="Lĩnh vực công ty"
                control={form.control}
                selectedValue={selectedIndustry}
                options={data.industries} />
            </div>

            <div className="mb-3">
              <FrmSelect name="frmJobLocation"
                label="Địa điểm làm việc"
                control={form.control}
                selectedValue={selectedLocation}
                options={data.locations}
                isMulti />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-4">
              <FrmInput name="frmJobDes"
                label="Mô tả"
                as="textarea"
                rows={5} />
              <FrmInput name="frmJobReq"
                label="Yêu cầu"
                as="textarea"
                rows={5} />
            </div>

            <div className="mb-3 lg:flex grid grid-cols-1 md:grid-cols-2 lg:grid-cols-none lg:justify-start md:gap-4 items-end">
              <FrmFormatNumber
                name="frmJobSalaryMin"
                label="Mức lương"
                placeholder="Lương tối thiểu"
                control={form.control} />
              <FrmFormatNumber
                name="frmJobSalaryMax"
                placeholder="Lương tối đa"
                control={form.control} />

              <FrmSelect name="frmJobSalaryCurrency"
                control={form.control}
                selectedValue={selectedCurrency}
                options={salaryCurrency}
                placeholder="Chọn tiền tệ" />

              <FormCheck type="switch" id="frmJobSalaryHide" label="Ẩn mức lương" className="min-w-[180px] md:mb-5"  {...form.register("frmJobSalaryHide")} />
            </div>

            <FrmCreate name="frmJobTags" label="Từ khóa" selectedValue={tags} control={form.control} placeholder="Nhập từ khóa" options={data.tags}></FrmCreate>

            <FrmSelect name="frmJobCVLanguage"
              label="Ngôn ngữ hồ sơ"
              control={form.control}
              selectedValue={selectedLanguage}
              options={data.languages}
              isMulti />
            <div className="lg:flex grid grid-cols-1 md:grid-cols-2 lg:grid-cols-none lg:justify-start gap-4 items-end">
              <FrmInput name="frmJobContact"
                label="Người liên hệ"
                type="text"
                placeholder="VD: Bộ phận tuyển dụng">
              </FrmInput>

              <FormCheck type="switch" id="frmJobContactHide" label="Ẩn liên hệ" className="min-w-[180px] min-h-[30px] mb-3"  {...form.register("frmJobContactHide")} />
            </div>

            <FrmInput name="frmJobEmailCV"
              label="Email nhận hồ sơ"
              type="text"
              placeholder="VD: hr@company.com, manager@company.com"
              frmText={`Nếu nhập nhiều email, mỗi email phải cách nhau bằng dấu ",".`}>
            </FrmInput>

            <div className="mb-3">
              <FormCheck type="switch" id="frmJobHideCompany" label="Đăng tuyển ẩn danh" className="min-w-[240px]" {...form.register("frmJobHideCompany")} />
            </div>

          </div>
          <div className="mb-4 pt-3 border-t-2 border-t-gray-200"><h5>Thông tin công ty</h5></div>
          <div>
            <FrmSelect name="frmJobCompany"
              label="Tên công ty"
              control={form.control}
              selectedValue={selectedCompany}
              options={data.companies}
            />
          </div>
          <div className="grid my-5">
            <ButtonMain type="submit" >Đăng tin tuyển dụng</ButtonMain>
            {/* <ButtonMain as="a" href="/admin/jobs/draft?" >Xem trước</ButtonMain> */}
          </div>
        </Form>
      </FormProvider>
    </Dcard >
  )
}

export default PostJobForm
