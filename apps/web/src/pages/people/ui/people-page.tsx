import { getRouteApi } from "@tanstack/react-router";
import type { ReactNode } from "react";

import { KeywordForm } from "#/shared/ui/keyword-form";

import { PeopleTable } from "./people-table";

const TITLE = "担当者";

const route = getRouteApi("/people/");

const PeoplePage = (): ReactNode => {
  const { keyword } = route.useSearch();
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold">{TITLE}</h1>
      <KeywordForm action="/people" label="名前・別名義" keyword={keyword} />
      <PeopleTable />
    </div>
  );
};

export { PeoplePage };
