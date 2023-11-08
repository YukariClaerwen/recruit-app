import { db } from "@/lib/db";

export const getMajor = async () => {
    try {
        const majors = await db.nhomNganh.findMany({
            where: {is_deleted: false},
            select: {
                id: true,
                ten_nhom: true,
                icon: true,
                ds_nganh_nghe: {
                    where: {is_deleted: false},
                    select: {
                        id: true,
                        ten_nganh: true,
                        icon: true,
                        _count: {
                            select: { ds_viec_lam: true }
                        }
                    }
                }
            }
        })
        return majors;

    } catch (e) {
        return ({ status: 500, message: e });
    }
}
