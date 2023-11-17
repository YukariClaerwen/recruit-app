import { db } from "@/lib/db";
import { cache } from "react";

export const getLocations = cache(async (take) => {
    try {
      const locations = await db.tinhThanh.findMany({
        take: take,
        where: {is_deleted: false},
        select: {
            id: true,
            ten_tinh_thanh: true
        },
        orderBy: {
            ds_viec_lam: {
                _count: 'desc',
            },
        },
      })

      const data = locations.map(l => {
        return {
            id: l.id,
            name: l.ten_tinh_thanh
        }
      })

      return {data , status: 200};
    } catch (err) {
        console.log(err.message)
        return({message: err.message, status: 500})
    }
})