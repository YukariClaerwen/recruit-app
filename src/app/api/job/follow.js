
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { cache } from "react";

export const revalidate = 3600 // revalidate the data at most every hour

export const saveJob = cache(async (req) => {
    try {
        
        const session = await getServerSession()
        const { jobId, isFavorite } = req

        if (!session?.user) {
            return ({ user: null, message: "Hãy đăng nhập để thực hiện chức năng này", status: 404 })
        }

        const _user = await db.taiKhoan.findUnique({
            where: { email: session?.user.email },
            select: {
                ung_vien: {
                    where: { is_deleted: false },
                    select: { ung_vien_id: true }
                }
            }
        })

        if (!_user) {
            return ({ user: null, message: "Hãy đăng nhập để thực hiện chức năng này", status: 404 })
        }

        const isCreated = await db.viecLamYeuThich.findFirst({
            where: { ung_vien_id: _user.ung_vien.ung_vien_id, viec_lam_id: jobId }
        })

        if (isCreated) {
            const save = await db.viecLamYeuThich.updateMany({
                where: {
                    AND: {
                        ung_vien_id: _user.ung_vien.ung_vien_id,
                        viec_lam_id: jobId
                    }
                },
                data: { is_deleted: (isFavorite) ? true : false }
            })
            return ({ data: save, message: "success", status: 200 });
        } else {
            const save = await db.viecLamYeuThich.create({
                data: {
                    viec_lam_id: jobId,
                    ung_vien_id: _user.ung_vien.ung_vien_id,
                }
            })
            return ({ data: save, message: "success", status: 200 });
        }


    } catch (err) {
        console.log(err.message)
        return ({ message: err.message, status: 500 });
    }
})