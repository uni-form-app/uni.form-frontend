import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export interface DecodedUser {
  exp: number;
  id: string;
  email: string;
  username: string;
}

export default async function middleware(request: NextRequest) {
  const cookie = await cookies();
  const token = cookie.get("token")?.value;

  const isLoginPage = request.nextUrl.pathname === '/login';

  if (!token) {
    if (isLoginPage) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL('/login', request.url));
  }

  console.log(token);

  try {
    const decoded = jwt.decode(token) as DecodedUser;

    const currentTime = Math.floor(Date.now() / 1000);
    if (decoded.exp < currentTime) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

  } catch (error) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
