import { db } from "@/lib/db";
import { Tags } from "lucide-react";
import { NextResponse } from "next/server";

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

        const dataLocations = frmJobLocation.map(item => {
            return {
                tinh_thanh_id: item.value,
            }
        })
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
        const findTags = await prisma.tuKhoa.findMany({
            select: { id: true },
            where: {
                ten_tu_khoa: { in: tags }
            }
        })
        const dataTags = findTags.map(tag => {
            return { tu_khoa_id: tag.id }
        })

        const dataUser = await prisma.taiKhoan.findUnique({
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
                ds_dia_diem: {
                    create: dataLocations, //done
                },
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

        console.log(newJob);


        return NextResponse.json({ job: findTags, message: "New job created successfully" })
    } catch (err) {
        throw new Error(err);
    }
}