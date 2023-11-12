
import { db } from "@/lib/db";
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
    created_at: true,
    nha_tuyen_dung: {
        select: {
            ten_cong_ty: true,
            logo: true
        }
    },
    ds_dia_diem: {
        select: {
            tinh_thanh: {
                select: { ten_tinh_thanh: true }
            }
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
const returnJobsItem = (jobs) => {
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
            locations: item.ds_dia_diem.map(loc => {
                return loc['tinh_thanh']['ten_tinh_thanh']
            }),
            tags: item.ds_tu_khoa.map(tag => {
                return tag['tu_khoa']['ten_tu_khoa']
            })
        }
    }
    const data = jobs.map(item => {
        if (item.luong_thuong_luong) {
            return {
                ...defaultValues(item),
                salary: false
            }
        }
        return {
            ...defaultValues(item),
            salary: {
                min: item.luong_toi_thieu.toFixed(0).toString(),
                max: item.luong_toi_da.toFixed(0).toString(),
                currency: item.luong_loai_tien,
            },
        }
    })

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
        const newJobs =  await jobs.sort((a, b) => {
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


export const getJobs = cache(async (page = 1, sort, tag, major) => {
    const sortBy = sort == "asc" ? sortAsc
                 : sort == "desc" ? sortByDefault
                 : sort == "salary" ? sortSal
                 : sortByDefault
    const where = {
        nganh_nghe_id: major,
        ds_tu_khoa: {
            some: {
                tu_khoa_id: tag
            }
        }
    }

    try {
        let take = 10;
        let skip = (page - 1) * take;

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

        const data = returnJobsItem(await jobs)
        return {
            data: data,
            pagination: {
                total: count
            }
        }

    } catch (err) {
        return ({ message: err, status: 500 });
    }
})

export const getJobById = cache(async (id) => {
    try {
        const job = await db.viecLam.findUnique({
            select: {
                id: true,
                nganh_nghe: { select: { ten_nganh: true, } },
                cap_bac: { select: { ten_cap_bac: true } },
                nha_tuyen_dung: {
                    select: {
                        nha_tuyen_dung_id: true,
                        ten_cong_ty: true,
                        logo: true
                    }
                },
                chuc_danh: true,
                linh_vuc: { select: { ten_linh_vuc: true } },
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
                ds_dia_diem: {
                    select: {
                        tinh_thanh: {
                            select: { ten_tinh_thanh: true }
                        }
                    }
                },
                ds_tu_khoa: {
                    select: {
                        tu_khoa: {
                            select: { id: true, ten_tu_khoa: true }
                        }
                    }
                },
                _count: {
                    select: {
                        ds_dia_diem: true,
                        ds_thich: true,
                        ds_tu_khoa: true
                    }
                }
            },
            where: { id: parseInt(id) }
        })

        const data = {
            id: job.id,
            major: job.nganh_nghe.ten_nganh,
            level: job.cap_bac.ten_cap_bac,
            ...(job.an_danh ? { company: false } : {
                company: {
                    id: job.nha_tuyen_dung.nha_tuyen_dung_id,
                    name: job.nha_tuyen_dung.ten_cong_ty,
                    logo: job.nha_tuyen_dung.logo
                },
            }),
            title: job.chuc_danh,
            industry: job.linh_vuc.ten_linh_vuc,
            type: job.loai_viec_lam,
            descriptions: job.mo_ta,
            requirements: job.yeu_cau,
            ...(job.luong_thuong_luong ? { salary: false } : {
                salary: {
                    min: job.luong_toi_thieu.toFixed(0).toString(),
                    max: job.luong_toi_da.toFixed(0).toString(),
                    currency: job.luong_loai_tien,
                }
            }),
            workingTime: job.thoi_gian_lam_viec,
            ...(job.an_lien_he ? { contact: false } : {
                contact: {
                    person: job.nguoi_lien_he,
                    email: job.ds_email_cv,
                }
            }),
            closeDate: job.han_nhan_ho_so,
            views: job.luot_xem,
            fromAge: job.tu_tuoi,
            toAge: job.den_tuoi,
            state: job.trang_thai,
            cvLangs: job.ngon_ngu_ho_so.map(lang => {
                return lang["label"]
            }),
            postDate: job.created_at,
            locations: job.ds_dia_diem.map(loc => {
                return loc["tinh_thanh"]["ten_tinh_thanh"]
            }),
            tags: job.ds_tu_khoa.map(tag => {
                return {
                    id: tag.tu_khoa.id,
                    name: tag.tu_khoa.ten_tu_khoa
                }
            })

        }

        return data;
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
        const locArr = []
        if (location != null && location != "all") {
            locArr.push(parseInt(location));
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

        if (location == "all") {
            query = {
                OR: keys
            }
        } else {
            query = {
                OR: keys,
                ds_dia_diem: {
                    some: {
                        tinh_thanh_id: {
                            in: locArr
                        }
                    }
                },
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
            data: data,
            pagination: {
                total: count
            }
        }
    } catch (err) {
        return ({ message: err, status: 500 });
    }
})

export const searchJobsByTag = cache(async() => {

})