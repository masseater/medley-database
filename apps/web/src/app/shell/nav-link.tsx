import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

const ALL = {};
const ACTIVE = { className: "text-foreground" };

const NavLink = ({
  to,
  label,
}: Readonly<{ to: "/videos" | "/songs" | "/people"; label: string }>): ReactNode => (
  <Link
    to={to}
    search={ALL}
    className="text-muted-foreground hover:text-foreground text-sm"
    activeProps={ACTIVE}
  >
    {label}
  </Link>
);

export { NavLink };
