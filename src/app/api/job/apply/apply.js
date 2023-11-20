
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"
import { cache } from "react"; 
import { del } from '@vercel/blob';

export const runtime = 'edge';

export const applyJob = cache(async (req) => {
    try {
        const { cv, jobId } = req
        const session = await getServerSession(authOptions);

        if (!session.user) {
            const urlToDelete = cv;
            const deleteCV = await del(urlToDelete);
            return ({ data: deleteCV, message: "Vui lòng đăng nhập để thực hiện chức năng này", status: 404 });
        }
        if (session.user.role != 'user') {
            const urlToDelete = cv;
            const deleteCV = await del(urlToDelete);
            return ({ data: deleteCV, message: "Vui lòng đăng nhập tài khoản ứng viên để thực hiện chức năng này", status: 404 });
        }
        const user = await db.taiKhoan.findUnique({
            where: { email: session.user.email, is_deleted: false },
            select: {
                ung_vien: {
                    select: { ung_vien_id: true }
                }
            }
        })
        const userId = await user.ung_vien.ung_vien_id;

        const job = await db.viecLam.findUnique({
            where: { id: parseInt(jobId), is_deleted: false },
            select: { nha_tuyen_dung_id: true }
        })

        const compId = await job.nha_tuyen_dung_id;

        const application = await db.donUngTuyen.create({
            data: {
                viec_lam_id: parseInt(jobId),
                ung_vien_id: userId,
                nha_tuyen_dung_id: compId,
                cv_url: cv
            }
        })

        return {
            data: application,
            message: "Bạn đã nộp đơn thành công.",
            status: 201
            // pagination: {
            //     total: count
            // }
        }

    } catch (err) {
        console.log(err)
        return ({ message: err.message, status: 500 });
    }
})