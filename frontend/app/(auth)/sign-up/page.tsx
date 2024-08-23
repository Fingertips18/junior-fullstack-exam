import Link from "next/link";

import { Button } from "@/components/shadcn/button";
import { AppRoutes } from "@/constants/routes";

import { SignUpForm } from "./_components/sign-up-form";

export default function SignUpPage() {
  return (
    <section className="w-full md:w-[512px] flex items-center flex-col space-y-4 group">
      <h4 className="text-2xl lg:text-4xl font-bold transition-all group-hover:drop-shadow-text-glow">
        Sign Up
      </h4>
      <div className="w-full border rounded-md p-4 lg:p-6 transition-all shadow-2xl group-hover:shadow-primary/50">
        <SignUpForm />
      </div>
      <div className="flex-center">
        <p className="font-semibold text-sm">Already have an account?</p>
        <Button asChild variant={"link"} className="flex-1">
          <Link href={AppRoutes.signIn}>Sign In</Link>
        </Button>
      </div>
    </section>
  );
}
