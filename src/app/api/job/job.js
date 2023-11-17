
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { cache } from "react";

export const revalidate = 3600 // revalidate the data at most every hour

const selectJobList = {
    id: true,
    chuc_danh: true,
    luong_toi_thieu: true,
    luong_toi_da: true,
    luong_thuong_luong: true,
    luong_loai_tien: true,
    luot_xem: true,
    dia_diem: {
        select: {
            id: true,
            ten_tinh_thanh: true,
        }
    },
    created_at: true,
    nha_tuyen_dung: {
        select: {
            ten_cong_ty: true,
            logo: true
        }
    },
    ds_tu_khoa: {
        select: {
            tu_khoa: {
                select: {
                    ten_tu_khoa: true,
                }
            }
        }
    }
}

const defaultValues = (item) => {

    return {
        id: item.id,
        title: item.chuc_danh,
        views: item.luot_xem,
        posted_at: item.created_at,
        company: {
            name: item.nha_tuyen_dung.ten_cong_ty,
            logo: item.nha_tuyen_dung.logo,
        },
        location: {
            id: item.dia_diem.id,
            name: item.dia_diem.ten_tinh_thanh,
        },
        tags: item.ds_tu_khoa.map(tag => {
            return tag['tu_khoa']['ten_tu_khoa']
        }),
        // isFavorite: checkFav(email, item.id) ? true : false
    }
}

const returnJobsItem = async (jobs) => {
    const session = await getServerSession()

    const data = await Promise.all(jobs.map(async item => {
        if (item.luong_thuong_luong) {
            return {
                ...defaultValues(item),
                salary: false,
                isSaved: session?.user ? await checkFav(session?.user.email, item.id) : false
            }
        }
        return {
            ...defaultValues(item),
            salary: {
                min: item.luong_toi_thieu.toFixed(0).toString(),
                max: item.luong_toi_da.toFixed(0).toString(),
                currency: item.luong_loai_tien,
            },
            isSaved: session?.user ? await checkFav(session?.user.email, item.id) : false
        }
    }))

    return data
}

const sortByDefault = {
    updated_at: 'desc',
}
const sortAsc = { updated_at: 'asc', }
const sortSal = { luong_thuong_luong: 'asc', }
const sortSalary = async (jobs, key) => {
    const rate = { usd: 1, vnd: 24000 }
    if (key == "salary") {
        const newJobs = await jobs.sort((a, b) => {
            const aExchange = (a.luong_loai_tien == 2 ? a.luong_toi_da * rate.vnd : a.luong_toi_da);
            const bExchange = (b.luong_loai_tien == 2 ? b.luong_toi_da * rate.vnd : b.luong_toi_da);
            return (aExchange - bExchange);
        }).sort((a, b) => {
            const aExchange = (a.luong_loai_tien == 2 ? a.luong_toi_thieu * rate.vnd : a.luong_toi_thieu);
            const bExchange = (b.luong_loai_tien == 2 ? b.luong_toi_thieu * rate.vnd : b.luong_toi_thieu);
            return (bExchange - aExchange);
        }).sort((a, b) => {
            return (a.luong_thuong_luong === b.luong_thuong_luong) ? 0 : b.luong_thuong_luong ? -1 : 1
        })
        return newJobs
    } else {
        return jobs
    }
}


export const getJobs = cache(async (take, page = 1, sort, tag, major) => {
    const sortBy = sort == "asc" ? sortAsc
        : sort == "desc" ? sortByDefault
            : sort == "salary" ? sortSal
                : sortByDefault
    const where = {
        OR: [
            { nganh_nghe_id: major },
            {
                ds_tu_khoa: {
                    some: {
                        tu_khoa_id: tag
                    }
                }
            },
        ],
        is_deleted: false,
    }

    try {
        // let take = 10;
        let skip = take ? (page - 1) * take : undefined;

        const [jobs, count] = await db.$transaction([
            db.viecLam.findMany({
                skip: skip,
                take: take,
                where: where,
                select: selectJobList,
                orderBy: sortBy
            }),
            db.viecLam.count({
                where: where
            })
        ])

        sortSalary(await jobs, sort)

        // console.log(await sortBySalary)
        // console.log(jobs)
        // console.log(session)
        const data = await returnJobsItem(jobs)

        // const js = await Promise.all(data.map(async job => {
        //     return {
        //         job,
        //         isSaved: await checkFav(session?.user.email, job.id)
        //     }
        // }))
        return {
            data: await data,
            pagination: {
                total: count
            }
        }

    } catch (err) {
        return ({ message: err, status: 500 });
    }
})

export const searchJobs = cache(async (key, location, page, sort) => {
    const sortBy = sort == "asc" ? sortAsc
        : sort == "desc" ? sortByDefault
            : sort == "salary" ? sortSal
                : sortByDefault
    try {
        let take = 10;
        let skip = (page - 1) * take;
        let locArr = []
        if (location != null && location != "all" && !Array.isArray(location)) {
            locArr.push(parseInt(location));
        } else if (Array.isArray(location)) {
            locArr = location.map(l => {
                return parseInt(l)
            })
        }

        let query = {}
        const keys = [
            { mo_ta: { contains: key, mode: 'insensitive', } },
            { yeu_cau: { contains: key, mode: 'insensitive', } },
            { chuc_danh: { contains: key, mode: 'insensitive', } },
            {
                ds_tu_khoa: {
                    some: {
                        tu_khoa: {
                            ten_tu_khoa: { contains: key, mode: 'insensitive', }
                        }
                    }
                }
            }
        ]

        if (location == "all" || location == null) {
            query = {
                OR: keys,
                is_deleted: false,
            }
        } else {
            query = {
                OR: keys,
                dia_diem_id: {
                    in: locArr
                },
                is_deleted: false,
                // ds_dia_diem: {
                //     some: {
                //         tinh_thanh_id: {
                //             in: locArr
                //         }
                //     }
                // },
            }
        }

        const [jobs, count] = await db.$transaction([
            db.viecLam.findMany({
                skip: skip,
                take: take,
                where: query,
                select: selectJobList,
                orderBy: sortBy
            }),
            db.viecLam.count({
                where: query
            })
        ])

        sortSalary(await jobs, sort)

        const data = returnJobsItem(await jobs)
        // return jobs
        return {
            data: await data,
            pagination: {
                total: count
            }
        }
    } catch (err) {
        console.log(err.message)
        return ({ message: err, status: 500 });
    }
})

export const getJobsByCompany = cache(async (id) => {
    const where = {
        nha_tuyen_dung_id: parseInt(id),
        is_deleted: false,
    }

    try {

        const [jobs, count] = await db.$transaction([
            db.viecLam.findMany({
                where: where,
                select: selectJobList,
            }),
            db.viecLam.count({
                where: where
            })
        ])

        // sortSalary(await jobs, "desc")
        const data = returnJobsItem(await jobs)
        return {
            data: await data,
            pagination: {
                total: count
            }
        }

    } catch (err) {
        console.log(err.message)
        return ({ message: err, status: 500 });
    }
})

export const getJobById = cache(async (id, viewFor) => {
    try {
        const job = await db.viecLam.findUnique({
            select: {
                id: true,
                nganh_nghe: { select: { id: true, ten_nganh: true, } },
                cap_bac: { select: { id: true, ten_cap_bac: true } },
                nha_tuyen_dung: {
                    select: {
                        nha_tuyen_dung_id: true,
                        ten_cong_ty: true,
                        logo: true
                    }
                },
                chuc_danh: true,
                linh_vuc: { select: { id: true, ten_linh_vuc: true } },
                dia_diem: { select: { id: true, ten_tinh_thanh: true } },
                loai_viec_lam: true,
                mo_ta: true,
                yeu_cau: true,
                luong_toi_thieu: true,
                luong_toi_da: true,
                luong_thuong_luong: true,
                luong_loai_tien: true,
                thoi_gian_lam_viec: true,
                nguoi_lien_he: true,
                an_lien_he: true,
                ds_email_cv: true,
                an_danh: true,
                han_nhan_ho_so: true,
                luot_xem: true,
                tu_tuoi: true,
                den_tuoi: true,
                trang_thai: true,
                ngon_ngu_ho_so: true,
                created_at: true,
                ds_tu_khoa: {
                    select: {
                        tu_khoa: {
                            select: { id: true, ten_tu_khoa: true }
                        }
                    }
                },
                _count: {
                    select: {
                        ds_thich: true,
                        ds_tu_khoa: true
                    }
                }
            },
            where: { id: parseInt(id) }
        })

        const data = {
            id: job.id,
            major: viewFor === "client" ? job.nganh_nghe.ten_nganh : {
                id: job.nganh_nghe.id,
                name: job.nganh_nghe.ten_nganh
            },
            level: viewFor === "client" ? job.cap_bac.ten_cap_bac : {
                id: job.cap_bac.id,
                name: job.cap_bac.ten_cap_bac
            },
            ...((job.an_danh && viewFor === "client") ? { company: false } : {
                company: {
                    hide: job.an_danh,
                    id: job.nha_tuyen_dung.nha_tuyen_dung_id,
                    name: job.nha_tuyen_dung.ten_cong_ty,
                    logo: job.nha_tuyen_dung.logo
                },
            }),
            location: viewFor === "client" ? job.dia_diem.ten_tinh_thanh : {
                id: job.dia_diem.id,
                name: job.dia_diem.ten_tinh_thanh
            },
            title: job.chuc_danh,
            industry: viewFor === "client" ? job.linh_vuc.ten_linh_vuc : {
                id: job.linh_vuc.id,
                name: job.linh_vuc.ten_linh_vuc,
            },
            type: job.loai_viec_lam,
            descriptions: job.mo_ta,
            requirements: job.yeu_cau,
            ...(job.luong_thuong_luong && viewFor === "client" ? { salary: false } : {
                salary: {
                    hide: job.luong_thuong_luong,
                    min: job.luong_toi_thieu.toFixed(0).toString(),
                    max: job.luong_toi_da.toFixed(0).toString(),
                    currency: job.luong_loai_tien,
                }
            }),
            workingTime: job.thoi_gian_lam_viec,
            ...(job.an_lien_he && viewFor === "client" ? { contact: false } : {
                contact: {
                    hide: job.an_lien_he,
                    person: job.nguoi_lien_he,
                    email: job.ds_email_cv,
                }
            }),
            closeDate: job.han_nhan_ho_so,
            views: job.luot_xem,
            fromAge: job.tu_tuoi,
            toAge: job.den_tuoi,
            state: job.trang_thai,
            cvLangs: viewFor === "client" ? job.ngon_ngu_ho_so.map(lang => {
                return lang["label"]
            }) : job.ngon_ngu_ho_so,
            postDate: job.created_at,
            tags: job.ds_tu_khoa.map(tag => {
                return {
                    id: tag.tu_khoa.id,
                    name: tag.tu_khoa.ten_tu_khoa
                }
            })

        }

        return data;
    } catch (err) {
        console.log(err.message)
        return ({ message: err.message, status: 500 });
    }
})

export const updateJob = cache(async (req) => {
    try {
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
            frmInfo: {
                email, jobId
            }
        } = await req

        const delete_oldTags = await db.tuKhoaViecLam.deleteMany({
            where: {
                viec_lam_id: jobId,
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

        const editJob = await db.viecLam.update({
            where: { id: jobId },
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
                nha_tuyen_dung_id: frmJobCompany.value,
            }
        })

        return {
            data: editJob,
            message: "Việc làm đã cập nhật thành công.",
            status: 200
        }

    } catch (err) {
        return ({ message: err, status: 500 });
    }
})

export const checkFav = async (email, jobId) => {
    const user = await db.taiKhoan.findUnique({
        where: { email: email },
        select: {
            ung_vien: {
                select: {
                    ung_vien_id: true
                }
            }
        }
    })

    const jobs = await db.viecLamYeuThich.findFirst({
        where: {
            ung_vien_id: user.ung_vien.ung_vien_id,
            viec_lam_id: jobId,
            is_deleted: false
        },
    })
    if (!jobs) {
        return false
    } else {
        return true
    }
}

export const getSavedJobsById = cache(async () => {
    try {
        // let take = 10;

        const session = await getServerSession()
        const user = await db.taiKhoan.findUnique({
            where: { email: session?.user.email },
            select: {
                ung_vien: {
                    select: {
                        ung_vien_id: true
                    }
                }
            }
        })

        const jobs = await db.viecLamYeuThich.findMany({
            where: { ung_vien_id: user.ung_vien.ung_vien_id, is_deleted: false },
            select: {
                viec_lam: {
                    select: selectJobList,
                }
            }
        })
        const arr = await jobs.map(j => {
            return j['viec_lam']
        })

        const data = returnJobsItem(await arr)
        return {
            data: await data
            // pagination: {
            //     total: count
            // }
        }

    } catch (err) {
        console.log(err)
        return ({ message: err.message, status: 500 });
    }
})