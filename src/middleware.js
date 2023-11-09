import { getToken } from 'next-auth/jwt';
import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server';
// import { middleware as activateMiddleware } from "@/middlewares/config";
// export { default } from 'next-auth/middleware'

// export async function middleware(req) {
//     const middlewareFunctions = activateMiddleware.map(fn => fn(req));
    
//     // for(const fn of middlewareFunctions) {
//     //     const result = await fn;
//     //     if(!result.ok) {
//     //         return result;
//     //     }
//     // }

//     // return NextResponse.next();

//     const results = await Promise.allSettled(middlewareFunctions);

//     for (const result of results) {
//         if (result.status === "fulfilled" && result.value?.ok) {
//             return result.value;
//         } else if (result.status === "rejected") {
//             throw result.reason
//         }
//     }

//     return NextResponse.next()

// }

// export const config = { matcher: ["/admin/:path*", "/extra", "/sign-in"] }



export default async function middleware(req) {
    const { pathname, origin } = req.nextUrl
    const token = await getToken({req});
    const isAuthenticated = !!token;
    // console.log(token)

    if (req.nextUrl.pathname.startsWith('/sign-in')
        && isAuthenticated) {
            return NextResponse.redirect(new URL(`${origin}/`), req.url);
    };

    if(req.nextUrl.pathname.startsWith('/admin') && !isAuthenticated) {
        return NextResponse.redirect(new URL(`${origin}/auth-admin/sign-in`))
    }

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

export const config = { matcher: ["/admin/:path*", "/extra", "/sign-in"] }