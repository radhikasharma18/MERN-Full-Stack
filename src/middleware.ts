import {NextRequest, NextResponse} from "next/server";
export {default} from "next-auth/middleware";
import {getToken} from "next-auth/jwt";

export async function middleware(request: NextRequest) {
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
    const url = request.nextUrl;

    const isAuthPage = ["/sign-in", "/sign-up", "/verify-email", "/"].some(
        (path) => url.pathname === path || url.pathname.startsWith(`${path}/`)
    );
    const isDashboardPath = url.pathname.startsWith("/dashboard");

    if (token && isAuthPage) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    if (!token && isDashboardPath) {
        return NextResponse.redirect(new URL("/sign-in", request.url));
    }
 
    
    return NextResponse.next();
}
export const config = {
    matcher:[
        "/", 
        "/sign-in",
        "/sign-up",
        "/dashboard/:path*",
        "/verify-email",
    ]
};
