import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

const ALL = {};

const StatLink = ({
  to,
  label,
  value,
}: Readonly<{ to: "/videos" | "/songs" | "/people"; label: string; value: number }>): ReactNode => (
  <Link to={to} search={ALL} className="hover:bg-muted flex flex-col gap-1 rounded-lg border p-4">
    <span className="text-muted-foreground text-sm">{label}</span>
    <span className="text-3xl font-semibold tabular-nums">{value}</span>
  </Link>
);

export { StatLink };
