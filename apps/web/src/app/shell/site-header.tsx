import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

import { KeywordForm } from "#/shared/ui/keyword-form";

import { NavLink } from "./nav-link";

const SITE_NAME = "Medley Manager";

const SiteHeader = (): ReactNode => (
  <header className="mx-auto flex max-w-5xl flex-wrap items-center gap-x-6 gap-y-3 border-b px-4 py-3">
    <Link to="/" className="font-bold">
      {SITE_NAME}
    </Link>
    <NavLink to="/videos" label="動画" />
    <NavLink to="/songs" label="曲" />
    <NavLink to="/people" label="担当者" />
    <KeywordForm action="/search" label="曲・動画・担当者" keyword="" />
  </header>
);

export { SiteHeader };
