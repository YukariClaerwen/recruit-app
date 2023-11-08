import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from 'bcrypt';
import { db } from './db';

export const authOptions = {
    adapter: PrismaAdapter(db),
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: 'jwt'
    },
    pages: {
        signIn: '/sign-in',
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "jsmith@mail.com" },
                password: { label: "Password", type: "password", placeholder: "Your password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                const existingUser = await db.taiKhoan.findUnique({
                    where: { email: credentials?.email.toLowerCase() }
                });
                if (!existingUser) {
                    return null;
                }

                const passwordMatch = await compare(credentials.password, existingUser.mat_khau);

                if (!passwordMatch) {
                    return null;
                }
                let userRole = "user";
                const roleAdmin = await db.quanTri.findUnique({
                    where: { tai_khoan_id: existingUser.id}
                });
                if(roleAdmin) {
                    userRole = "admin";
                }
                const roleConsultant = await db.tuVanVien.findUnique({
                    where: { tai_khoan_id: existingUser.id}
                })
                if(roleConsultant) {
                    userRole = "consultant";
                }
                const roleRecruiter = await db.nhaTuyenDung.findUnique({
                    where: { tai_khoan_id: existingUser.id}
                })
                if(roleRecruiter) {
                    userRole = "recruiter";
                }

                return {
                    id: `${existingUser.id}`,
                    username: existingUser.ten_tai_khoan,
                    email: existingUser.email,
                    role: userRole,
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if(user) {
                return {
                    ...token,
                    username: user.username,
                    role: user.role,
                }
            }
            return token
        },
        async session({ session, token }) {
            return {
                ...session,
                user: {
                    ...session.user,
                    username: token.username,
                    role: token.role,
                }
            }
        }
    }
}
