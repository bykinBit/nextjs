import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Next.js Middleware - 用于路由保护
 * 运行在 Edge Runtime，只能访问 Cookies，不能访问 LocalStorage
 */
export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const token = request.cookies.get('token')?.value;

    // 公开路由
    const isPublicRoute = pathname === '/' || pathname === '/login';

    // 1. 如果没有 token 且访问非公开路由 -> 重定向到登录页
    if (!token && !isPublicRoute) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // 2. 如果已登录但访问登录页 -> 重定向到首页
    if (token && pathname === '/login') {
        return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
}

/**
 * 匹配所有需要拦截的路由
 * 排除静态资源、API 等
 */
export const config = {
    matcher: [
        /*
         * 匹配所有路径，除了：
         * 1. /api (API 路由)
         * 2. /_next/static (静态文件)
         * 3. /_next/image (图片优化文件)
         * 4. /favicon.ico (浏览器图标)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
