import type { ReactNode } from "react";

import { Input } from "./input";

const KeywordForm = ({
  action,
  label,
  keyword,
}: Readonly<{ action: string; label: string; keyword: string | undefined }>): ReactNode => (
  <form action={action} method="get">
    <Input
      type="search"
      name="keyword"
      defaultValue={keyword}
      placeholder={label}
      aria-label={label}
    />
  </form>
);

export { KeywordForm };
