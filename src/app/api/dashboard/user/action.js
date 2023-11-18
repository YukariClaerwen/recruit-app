
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"
import { cache } from "react";

export const checkEmail = cache(async req => {
    try {

        const { email } = req;

        const existing = await db.taiKhoan.findUnique({
            where: { email : email }
        })

        if(existing) {
            return ({message: "Email đã tồn tại", status: 409})
        } else {
            return ({message: "Email hợp lệ", status: 200})
        }

    } catch (err) {
        console.log(err.message)
        return ({ message: err.message, status: 500 });
    }
})