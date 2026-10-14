import { getRouteApi } from "@tanstack/react-router";
import type { ReactNode } from "react";

import { KeywordForm } from "#/shared/ui/keyword-form";

import { SongsTable } from "./songs-table";

const TITLE = "曲";

const route = getRouteApi("/songs/");

const SongsPage = (): ReactNode => {
  const { keyword } = route.useSearch();
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold">{TITLE}</h1>
      <KeywordForm action="/songs" label="曲名・アーティスト・別表記" keyword={keyword} />
      <SongsTable />
    </div>
  );
};

export { SongsPage };
