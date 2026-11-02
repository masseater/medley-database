import type { ReactNode } from "react";

import { signInWithPasskey } from "#/pages/admin-sign-in/api/sign-in";
import { ActionPanel } from "#/shared/ui/action-panel";

const SignInPage = (): ReactNode => (
  <ActionPanel
    title="管理者ログイン"
    label="パスキーでログイン"
    done="ログインしました"
    failed="ログインできませんでした"
    action={signInWithPasskey}
  />
);

export { SignInPage };
