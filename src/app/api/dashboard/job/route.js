import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { updateJob } from "../../job/job";

export async function POST(req) {
    try {
        const body = await req.json();
        const {
            frmJob: {
                frmJobTitle,
                frmJobLevel,
                frmJobType,
                frmJobMajor,
                frmJobCompField,
                frmJobLocation,
                frmJobSalaryHide,
                frmJobSalaryMax,
                frmJobSalaryMin,
                frmJobSalaryCurrency,
                frmJobTags,
                frmJobCVLanguage,
                frmJobContact,
                frmJobContactHide,
                frmJobDes,
                frmJobEmailCV,
                frmJobHideCompany,
                frmJobReq,
                frmJobCompany,
            },
            // frmCompany: {

            // },
            frmUser: {
                email,
            }
        } = body

        const newTags = frmJobTags.filter(item => item.__isNew__ === true).map(tag => {
            return {
                ten_tu_khoa: tag.label
            }
        })
        if (newTags.length > 0) {
            const _newTags = await db.tuKhoa.createMany({
                data: newTags,
                skipDuplicates: true
            })
        }
        const tags = frmJobTags.map(tag => {
            return tag['label']
        })
        const findTags = await db.tuKhoa.findMany({
            select: { id: true },
            where: {
                ten_tu_khoa: { in: tags }
            }
        })
        const dataTags = findTags.map(tag => {
            return { tu_khoa_id: tag.id }
        })

        const dataUser = await db.taiKhoan.findUnique({
            select: { id: true },
            where: { email: email }
        })

        const newJob = await db.viecLam.create({
            data: {
                chuc_danh: frmJobTitle, //done
                cap_bac_id: frmJobLevel.value, //done
                loai_viec_lam: frmJobType, //done
                nganh_nghe_id: frmJobMajor.value, //done
                linh_vuc_id: frmJobCompField.value, //đone
                dia_diem_id: frmJobLocation.value,
                mo_ta: frmJobDes, //done
                yeu_cau: frmJobReq, //done
                luong_toi_thieu: parseFloat(frmJobSalaryMin.replace(/\s/g, "").replace(".", "")),
                luong_toi_da: parseFloat(frmJobSalaryMax.replace(/\s/g, "").replace(".", "")),
                luong_loai_tien: parseInt(frmJobSalaryCurrency.value),
                luong_thuong_luong: frmJobSalaryHide, //done
                ds_tu_khoa: {
                    create: dataTags    //done
                },
                ngon_ngu_ho_so: frmJobCVLanguage, //done
                nguoi_lien_he: frmJobContact, //done
                an_lien_he: frmJobContactHide, //done
                ds_email_cv: frmJobEmailCV, //done
                an_danh: frmJobHideCompany, //done
                // thoi_gian_lam_viec,
                // han_nhan_ho_so,
                // thoi_gian_dang,
                // so_luong,
                // tu_tuoi,
                // den_tuoi,
                // trang_thai,
                // thao_tac,
                // ngon_ngu_id,
                tai_khoan_id: dataUser.id,
                nha_tuyen_dung_id: frmJobCompany.value,
            }
        })

        // console.log(newJob);


        return NextResponse.json({ job: newJob, message: "New job created successfully" }, {status: 201})
    } catch (err) {
        console.log(err)
        return NextResponse.json({ message: "Có lỗi xảy ra, không thể đăng việc làm!"}, { status: 500 })
    }
}


export async function PUT(req) {
    try {
        const body = await req.json();
        
        const result = await updateJob(body);

        if (result.status === 500) {
            return NextResponse.json({ message: result.message.job}, { status: 500 })
        }
        if (result.status === 409) {
            return NextResponse.json({ message: result.message}, { status: 409 })
        }
        return NextResponse.json({ edit: result.data, message: result.message }, { status: 200 })

    } catch (err) {
        console.log(err)
        return NextResponse.json({ message: "Có lỗi xảy ra, không thể cập nhật việc làm!"}, { status: 500 })
    }
}