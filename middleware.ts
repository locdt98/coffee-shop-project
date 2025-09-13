import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";


export function middleware(req: NextRequest) {
    const token = req.cookies.get("token")?.value;
    const role:number = Number(req.cookies.get("role")?.value); 
    const pathname = req.nextUrl.pathname;
    
    const protectedRoutes = ["/doi-mat-khau", "/download"]; // Các route cần đăng nhập
    if (protectedRoutes.includes(pathname) && !token)
    return NextResponse.redirect(new URL("/dang-nhap", req.url));

    const isAdminRoute = pathname.startsWith("/admin"); // route dành cho admin (vai_tro = 1)
    if (isAdminRoute) {
      if (!token || !role) return NextResponse.redirect(new URL("/login", req.url));
      if (role !== 1)  return NextResponse.redirect(new URL("/", req.url)); // Ko có quyền
    }
    return NextResponse.next(); //cho qua
}

export const config = {  // Áp dụng middleware cho các route này
    matcher: ["/doi-mat-khau", "/download", "/admin/:path*"], 
};

