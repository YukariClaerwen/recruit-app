import { db } from "@/lib/db";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";

export async function PUT(req){
    try {
        const body = await req.json();
        const { pathname } = new URL(req.url, `http://${req.headers.host}`);
        const [, resetToken] = pathname.split('/').slice(-2);
        const { password } = body;

        console.log(resetToken);

        // check if email already exists
        const findUser = await db.taiKhoan.findFirst({
            where: { resetToken: resetToken }
        });

        if (!findUser) {
            return NextResponse.json({ message: "Invalid reset token" }, { status: 404 });
        }
        // Update the user record in the database with the reset token
        const hashedPassword = await hash(password, 10);
        await db.taiKhoan.update({
            where: { id: findUser.id },
            data: { mat_khau: hashedPassword },
        });
        return NextResponse.json({ message: "Cập nhật mật khẩu thành công" }, { status: 200 });

    } catch (err) {
        throw new Error(err);
    }
}