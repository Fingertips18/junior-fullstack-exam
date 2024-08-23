import { AuthType } from "@/lib/types/auth-type";

const base = process.env.BASE_URL!;
const signInUrl = `${base}/sign-in`;
const signUpUrl = `${base}/sign-up`;

export const AuthService = {
  signUp: async (values: Partial<AuthType>) => {
    const data = {
      username: values.username,
      email: values.email,
      password: values.password,
    };

    const response = await fetch(signUpUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(
        `Server Error! status: ${response.status}, text: ${response.statusText}`
      );
    }

    return await response.json();
  },

  signIn: async (values: Partial<AuthType>) => {
    const data = {
      email: values.email,
      password: values.password,
    };

    const response = await fetch(signInUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(
        `Server Error! status: ${response.status}, text: ${response.statusText}`
      );
    }

    const { access_token, refresh_token } = await response.json();

    return { access_token, refresh_token };
  },
};
