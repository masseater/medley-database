import type { ReactNode } from "react";

const SEPARATOR = "・";

const Facts = ({ values }: Readonly<{ values: readonly (string | null)[] }>): ReactNode => {
  const facts = values.filter((value) => value !== null && value !== "").join(SEPARATOR);
  return facts !== "" && <p className="text-muted-foreground">{facts}</p>;
};

export { Facts };
