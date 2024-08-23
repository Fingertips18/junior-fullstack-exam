"use server";

import { cookies } from "next/headers";
import { jwtVerify } from "jose";

import { AuthService } from "@/lib/services/auth-service";
import { AuthType } from "@/lib/types/auth-type";
import { key } from "@/constants/keys";

export async function onSignUp(values: Partial<AuthType>) {
  try {
    const response = await AuthService.signUp(values);
    return response;
  } catch (e) {
    throw new Error(`Server error: ${e}`);
  }
}

export async function onSignIn(values: Partial<AuthType>) {
  try {
    const { access_token, refresh_token } = await AuthService.signIn(values);

    const atPayload = (await jwtVerify(access_token, key)).payload;
    const rtPayload = (await jwtVerify(refresh_token, key)).payload;

    const cookieStore = cookies();
    cookieStore.set({
      name: "access_token",
      value: access_token,
      httpOnly: true,
      expires: new Date(atPayload.exp! * 1000),
    });
    cookieStore.set({
      name: "refresh_token",
      value: refresh_token,
      httpOnly: true,
      expires: new Date(rtPayload.exp! * 1000),
    });

    return;
  } catch (e) {
    throw new Error(`Server error: ${e}`);
  }
}
