import { getToken } from 'next-auth/jwt';
import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server';

export default async function middleware(req) {
    const { pathname, origin } = req.nextUrl
    const token = await getToken({req});
    const isAuthenticated = !!token;
    // console.log(token)

    if (req.nextUrl.pathname.startsWith('/sign-in')
        && isAuthenticated) {
            return NextResponse.redirect(new URL(`${origin}/`), req.url);
    };

    if(req.nextUrl.pathname.startsWith('dashboard') && !isAuthenticated) {
        return NextResponse.redirect(new URL(`${origin}/sign-in`))
    }

    if(req.nextUrl.pathname.startsWith('/admin') && !isAuthenticated) {
        return NextResponse.redirect(new URL(`${origin}/auth-admin/sign-in`))
    }

    // if (req.nextUrl.pathname.startsWith("/dashboard")
    //     && isAuthenticated
    //     && token?.role !== "user"
    //     && token?.role !== "admin") {
    //     return NextResponse.rewrite(
    //         new URL("/denied", req.url)
    //     )
    // }
    if (req.nextUrl.pathname.startsWith("/admin")
        && isAuthenticated
        && token?.role !== "consultant"
        && token?.role !== "admin") {
        return NextResponse.rewrite(
            new URL("/denied", req.url)
        )
    }

    return await withAuth(req, {
        pages: {
            signIn:'/sign-in'
        },
    })
}

export const config = { matcher: ["/admin/:path*", "/extra", "/sign-in", "/dashboard"] }