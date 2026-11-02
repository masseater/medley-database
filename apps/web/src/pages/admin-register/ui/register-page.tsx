import type { ReactNode } from "react";

import { registerPasskey } from "#/pages/admin-register/api/register";
import { ActionPanel } from "#/shared/ui/action-panel";

const RegisterPage = (): ReactNode => (
  <ActionPanel
    title="管理者の登録"
    label="パスキーを登録"
    done="登録しました"
    failed="登録できませんでした"
    action={registerPasskey}
  />
);

export { RegisterPage };
