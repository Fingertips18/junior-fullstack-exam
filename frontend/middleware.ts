import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

import { onRefreshAccessToken } from "@/lib/actions/token-action";
import { AppRoutes } from "@/constants/routes";
import { key } from "@/constants/keys";

export const config = {
  matcher: ["/((?!sign-in|sign-up|_next|favicon.ico).*)"],
};

export async function middleware(req: NextRequest) {
  const cookieStore = req.cookies;
  const accessToken = cookieStore.get("access_token")?.value;
  const refreshToken = cookieStore.get("refresh_token")?.value;

  try {
    if (accessToken) {
      await jwtVerify(accessToken, key);
      return NextResponse.next();
    }

    if (refreshToken) {
      await jwtVerify(refreshToken, key);
      await onRefreshAccessToken(refreshToken);
      return NextResponse.next();
    }

    return NextResponse.redirect(new URL(AppRoutes.signIn, req.url));
  } catch (_) {
    return NextResponse.redirect(new URL(AppRoutes.signIn, req.url));
  }
}
