import { db } from "@/lib/db";
import { cache } from "react";

export const getTags = cache(async (take) => {
    try {
        const tags = await db.tuKhoa.findMany({
            take: take,
            where: {is_deleted: false},
            select: {
                id: true,
                ten_tu_khoa: true
            },
            orderBy: {
                ds_viec_lam: {
                    _count: 'desc',
                },
            },
        })

        const data = tags.map(tag => {
            return {
                id: tag.id,
                name: tag.ten_tu_khoa
            }
        })
        return data;

    } catch (err) {
        return ({ message: err, status: 500 });
    }
})