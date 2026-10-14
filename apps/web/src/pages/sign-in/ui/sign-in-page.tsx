import type { ReactNode } from "react";

import { SignInForm } from "./sign-in-form";

const TITLE = "ログイン";

const SignInPage = (): ReactNode => (
  <section className="flex flex-col gap-4">
    <h1 className="text-2xl font-bold">{TITLE}</h1>
    <SignInForm />
  </section>
);

export { SignInPage };
