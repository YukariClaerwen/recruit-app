import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import Sqids from 'sqids'
import { Prisma } from "@prisma/client";
import AWS from 'aws-sdk';
import dotenv from 'dotenv';

dotenv.config();

// Set the appropriate AWS SES configuration based on the environment
const sesConfig = {
    accessKeyId: process.env.AWS_SES_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SES_SECRET_ACCESS_KEY,
    region: process.env.AWS_SES_REGION_NAME,
};

AWS.config.update(sesConfig);

const ses = new AWS.SES({ apiVersion: '2010-12-01' });

export async function POST(req) {
    try {
        const body = await req.json();
        const { email } = body;
        const user = await db.taiKhoan.findUnique({
            where: { email: email }
        });

        if (user) {
            // Generate a reset token (you can use a library like uuid or crypto)
            const resetToken = generateResetToken();

            // Update the user record in the database with the reset token
            await db.taiKhoan.update({
                where: { email: email },
                data: { resetToken: resetToken },
            });

            // Send email with reset link
            const resetLink = generateResetLink(resetToken);
            await sendResetEmail(email, resetLink);

            return NextResponse.json({ message: "Password reset email sent successfully.", user }, { status: 200 });
        } else {
            return NextResponse.json({ message: "Email không tồn tại trong hệ thống" }, { status: 404 });
        }
    } catch (err) {
        console.error('Error:', err);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}

// Function to generate a reset token
function generateResetToken() {
    const sqids = new Sqids({
        minLength: 10,
    })
    const token = sqids.encode([1, 2, 3]) // "86Rf07xd4z"
    return token;
}

// Function to generate the reset link based on the environment
function generateResetLink(resetToken) {
    const baseURL = process.env.NODE_ENV === 'production' ? 'https://your-production-domain.com' : 'http://localhost:3000';
    return `${baseURL}/password/verified/${resetToken}`;
}

// Function to send the reset email
async function sendResetEmail(email, resetLink) {
    // Construct the email message
    const mailOptions = {
        Destination: {
            ToAddresses: [email],
        },
        Message: {
            Body: {
                Text: {
                    Data: `Click the following link to reset your password: ${resetLink}`,
                },
            },
            Subject: {
                Data: 'Password Reset',
            },
        },
        Source: process.env.AWS_SES_FROM_EMAIL,
    };

    // Send the email
    try {
        await ses.sendEmail(mailOptions).promise();
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Failed to send password reset email');
    }
}