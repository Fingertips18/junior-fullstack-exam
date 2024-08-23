import Link from "next/link";

import { Button } from "@/components/shadcn/button";
import { AppRoutes } from "@/constants/routes";

import { SignInForm } from "./_components/sign-in-form";

export default function SignInPage() {
  return (
    <section className="w-full md:w-[512px] flex items-center flex-col space-y-4 group">
      <h4 className="text-2xl lg:text-4xl font-bold transition-all group-hover:drop-shadow-text-glow">
        Sign In
      </h4>
      <div className="w-full border rounded-md p-4 lg:p-6 transition-all shadow-2xl group-hover:shadow-primary/50">
        <SignInForm />
      </div>
      <div className="flex-center">
        <p className="font-semibold text-sm">Don't have an account yet?</p>
        <Button asChild variant={"link"} className="flex-1">
          <Link href={AppRoutes.signUp}>Sign Up</Link>
        </Button>
      </div>
    </section>
  );
}
