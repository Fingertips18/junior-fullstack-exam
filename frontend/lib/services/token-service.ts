import { JWTExpired, JWTInvalid } from "jose/errors";
import { jwtVerify } from "jose";

import { key } from "@/constants/keys";

const base =
  process.env.NODE_ENV === "production"
    ? process.env.BASE_URL
    : process.env.NEXT_PUBLIC_DEV_URL;
const url = `${base}/refresh`;

export const TokenService = {
  refreshAccessToken: async (token: string) => {
    try {
      await jwtVerify(token, key);

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refresh_token: token }),
      });

      if (!response.ok) {
        throw new Error(
          `Server Error! status: ${response.status}, text: ${response.statusText}`
        );
      }

      const newToken = await response.json();
      const { access_token } = newToken;

      return { access_token };
    } catch (err) {
      if (err instanceof JWTExpired) {
        throw new Error("Refresh token has expired");
      } else if (err instanceof JWTInvalid) {
        throw new Error("Invalid refresh token");
      } else {
        throw new Error("Unable to refresh token");
      }
    }
  },
};
