import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from 'bcrypt';
import { db } from './db';
import cuid from 'cuid';

function CustomPrismaAdapter(p) {
    return {
        ...PrismaAdapter(p),
        createUser: (data) => {
            const username = `user-${cuid()}`
            return p.taiKhoan.create({
                data: {
                    ...data,
                    ten_tai_khoan: username,
                    ung_vien: {
                        create: { ten: username }
                    }
                }
            })
        },
        getUser: (id) => p.taiKhoan.findUnique({ where: { id } }),
        getUserByEmail: (email) => p.taiKhoan.findUnique({ where: { email } }),
        updateUser: ({ id, ...data }) => p.taiKhoan.update({ where: { id }, data }),
        deleteUser: (id) => p.taiKhoan.delete({ where: { id } }),
    }
}

const setUserRole = async (id) => {
    let userRole = "user";
    const roleAdmin = await db.quanTri.findUnique({
        where: { tai_khoan_id: id }
    });
    if (roleAdmin) {
        userRole = "admin";
        return userRole
    }
    const roleConsultant = await db.tuVanVien.findUnique({
        where: { tai_khoan_id: id }
    })
    if (roleConsultant) {
        userRole = "consultant";
        return userRole
    }
    const roleRecruiter = await db.nhaTuyenDung.findUnique({
        where: { tai_khoan_id: id }
    })
    if (roleRecruiter) {
        userRole = "recruiter";
        return userRole
    }
    return userRole
}

export const authOptions = {
    adapter: CustomPrismaAdapter(db),
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: 'jwt'
    },
    pages: {
        signIn: '/sign-in'
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            }
        }),
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

                if (existingUser.mat_khau) {
                    const passwordMatch = await compare(credentials.password, existingUser.mat_khau);
                    if (!passwordMatch) {
                        return null;
                    }
                } else {
                    return null;
                }

                const userRole = setUserRole(await existingUser.id);

                return {
                    id: `${existingUser.id}`,
                    username: existingUser.ten_tai_khoan,
                    email: existingUser.email,
                    role: await userRole,
                }
            }
        })
    ],
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            const isAllowedToSignIn = true
            if (isAllowedToSignIn) {
                // console.log(user)
                return true
            } else {
                // Return false to display a default error message
                return false
                // Or you can return a URL to redirect to:
                // return '/unauthorized'
            }
        },
        async jwt({ token, user, account }) {
            let userRole;
            if (user) {
                if (account?.provider === "google") {
                    userRole = await setUserRole(user.id);
                }
                return await {
                    ...token,
                    username: user.username,
                    role: (account?.provider === "google") ? userRole : user.role,
                }
            }
            return await token
        },
        async session({ session, token }) {
            return await {
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
