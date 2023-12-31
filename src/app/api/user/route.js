
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { hash } from 'bcrypt';
import { Prisma } from "@prisma/client";
import AWS from 'aws-sdk';
import dotenv from 'dotenv';

dotenv.config();

AWS.config.update({
    accessKeyId: process.env.AWS_SES_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SES_SECRET_ACCESS_KEY,
    region: process.env.AWS_SES_REGION_NAME,
});

const ses = new AWS.SES({ apiVersion: '2010-12-01' });

export async function POST(req) {
    try {
        const body = await req.json();
        const { email, username, password, role } = body;

        // check if email already exists
        const existingUserByEmail = await db.taiKhoan.findUnique({
            where: { email: email}
        });
        if (existingUserByEmail) {
            return NextResponse.json({ user: null, message: `Email ${email} đã tồn tại, hãy đăng nhập hoặc tạo email khác` }, { status: 409 })
        }

        // check if username already exists
        const existingUserByUsername = await db.taiKhoan.findUnique({
            where: { ten_tai_khoan: username}
        });
        if (existingUserByUsername) {
            return NextResponse.json({ user: null, message: `Tên tài khoản ${username} đã tồn tại, hãy nhập một tên khác` }, { status: 409 })
        }

        const hashedPassword = await hash(password, 10);

        // Create a verification token
        const verificationToken = Math.random().toString(36).substring(2, 15);

        // Create a request to verify the email address
        const verifyParams = {
            EmailAddress: email,
        };

        // Send verification email
        await ses.verifyEmailIdentity(verifyParams).promise();

        let newUser = ''

        switch (role) {
            case 'admin':
                const admin = await db.taiKhoan.create({
                    data: {
                        email: email,
                        ten_tai_khoan: username,
                        mat_khau: hashedPassword,
                        quan_tri: {
                            create: { ho_ten: username }
                        }
                    }
                });
                newUser = await admin;
                break;
            case 'consultant':
                const consultant = await db.taiKhoan.create({
                    data: {
                        email: email,
                        ten_tai_khoan: username,
                        mat_khau: hashedPassword,
                        tu_van_vien: {
                            create: { ho_ten: username }
                        }
                    }
                });
                newUser = await consultant;
                break;
            case 'recruiter':
                const recruiter = await db.taiKhoan.create({
                    data: {
                        email: email,
                        ten_tai_khoan: username,
                        mat_khau: hashedPassword,
                        nha_tuyen_dung: {
                            create: { ten_cong_ty: username }
                        }
                    }
                });
                newUser = await recruiter;
                break;
            default:
                const user = await db.taiKhoan.create({
                    data: {
                        email: email,
                        ten_tai_khoan: username,
                        mat_khau: hashedPassword,
                        ung_vien: {
                            create: { ten: username }
                        }
                    }
                });
                newUser = await user;
        }
        const { mat_khau: newUserPasssword, ...rest } = newUser;

        return NextResponse.json({ user: rest, message: "Bạn đã đăng ký thành công, hãy đăng nhập vào tài khoản của bạn." }, { status: 201 });
    } catch (err) {
        throw new Error(err);
        // return NextResponse.json( { message: "Something went wrong"}, { status: 500 });
    }
}
