
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"
import { cache } from "react";

export const checkEmail = cache(async req => {
    try {

        const { email } = req;

        const existing = await db.taiKhoan.findUnique({
            where: { email: email }
        })

        if (existing) {
            return ({ message: "Email đã tồn tại", status: 409 })
        } else {
            return ({ message: "Email hợp lệ", status: 200 })
        }

    } catch (err) {
        console.log(err.message)
        return ({ message: err.message, status: 500 });
    }
})

export const getAppliedUserByJob = cache(async (jobId) => {
    try {
        const session = await getServerSession(authOptions);
        if (session?.user.role === 'user') {
            return ({ message: "Bạn không được phép thực hiện chức năng này", status: 404 })
        }
        
        const appliedCv = await db.donUngTuyen.findMany({
            where: {
                viec_lam_id: parseInt(jobId),
                is_deleted: false,
                ung_vien: {
                    is: {is_deleted: false}
                }
            },
            select: {
                cv_url: true,
                ung_vien: {
                    select: {
                        tai_khoan: {
                            select: {
                                email: true,
                                ten_tai_khoan: true,
                                name: true,
                                image: true
                            }
                        }
                    }
                },
                created_at: true,
            },
            orderBy: {
                created_at: 'desc'
            }
        })

        const data = await appliedCv.map(item => {
            return ({
                email: item.ung_vien.tai_khoan.email,
                username: item.ung_vien.tai_khoan.ten_tai_khoan,
                name: item.ung_vien.tai_khoan.name,
                image: item.ung_vien.tai_khoan.image,
                created_at: item.created_at,
                cv: item.cv_url,
            })
        })

        // console.log(appliedCv)
        return({
            data: data,
            status: 200
        })
    } catch (err) {
        console.log(err.message)
        return ({ message: err.message, status: 500 });
    }
})