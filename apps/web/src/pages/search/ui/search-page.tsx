import { getRouteApi } from "@tanstack/react-router";
import type { ReactNode } from "react";

import { KeywordForm } from "#/shared/ui/keyword-form";

import { FoundPeople } from "./found-people";
import { FoundSongs } from "./found-songs";
import { FoundVideos } from "./found-videos";

const route = getRouteApi("/search");

const SearchPage = (): ReactNode => {
  const { keyword } = route.useSearch();
  return (
    <div className="flex flex-col gap-8">
      <KeywordForm action="/search" label="曲・動画・担当者" keyword={keyword} />
      <FoundVideos />
      <FoundSongs />
      <FoundPeople />
    </div>
  );
};

export { SearchPage };
