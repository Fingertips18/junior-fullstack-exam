"use server";

import { cookies } from "next/headers";
import { jwtVerify } from "jose";

import { TokenService } from "@/lib/services/token-service";
import { key } from "@/constants/keys";

export async function onRefreshAccessToken(token: string) {
  try {
    const { access_token } = await TokenService.refreshAccessToken(token);

    const newPayload = (await jwtVerify(access_token, key)).payload;

    const cookieStore = cookies();
    cookieStore.set({
      name: "access_token",
      value: access_token,
      sameSite: "strict",
      path: "/",
      expires: new Date(newPayload.exp! * 1000),
    });

    return;
  } catch (e) {
    throw new Error(`Server error: ${e}`);
  }
}

export async function onRemoveTokens() {
  try {
    const cookieStore = cookies();
    cookieStore.delete("access_token");
    cookieStore.delete("refresh_token");
  } catch (e) {
    throw new Error(`Server error: ${e}`);
  }
}
