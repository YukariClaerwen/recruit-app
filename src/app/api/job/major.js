import { db } from "@/lib/db";
import { cache } from "react";

export const revalidate = 3600 // revalidate the data at most every hour

export const getMajors = cache(async (take) => {
    try {
        const majors = await db.nganhNghe.findMany({
            take: take,
            where: {is_deleted: false},
            select: {
                id: true,
                ten_nganh: true,
                icon: true,
                _count: {
                    select: {
                        ds_viec_lam: {
                            where: {is_deleted: false }
                        }
                    }
                }
            },
            orderBy: {
                ds_viec_lam: {
                    _count: 'desc',
                },
            },
        })

        const data = majors.map(major => {
            return {
                id: major.id,
                name: major.ten_nganh,
                icon: major.icon,
                _countJobs: major._count.ds_viec_lam
            }
        })

        return data;

    } catch (err) {
        return ({ message: err, status: 500 });
    }
})
