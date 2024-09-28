import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const token = request.cookies.get('token'); // Kiểm tra token (ví dụ lấy từ cookies)

    if (!token) {
        return NextResponse.redirect(new URL('/login', request.url)); // Nếu chưa đăng nhập, chuyển hướng đến login
    }

    return NextResponse.next(); // Tiếp tục nếu đã đăng nhập
}

export const config = {
    matcher: ['/', '/dashboard'], // Đặt matcher cho các route cần bảo vệ
};