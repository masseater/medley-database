import { getRouteApi } from "@tanstack/react-router";
import type { ReactNode } from "react";

import { VIDEO_KINDS } from "#/entities/catalog";

import { AllKindsLink } from "./all-kinds-link";
import { KindFilterLink } from "./kind-filter-link";

const route = getRouteApi("/videos/");

const KindFilter = (): ReactNode => {
  const { kind: current } = route.useSearch();
  return (
    <nav className="flex flex-wrap gap-2" aria-label="種類">
      <AllKindsLink selected={!VIDEO_KINDS.some((kind) => kind === current)} />
      {VIDEO_KINDS.map((kind) => (
        <KindFilterLink key={kind} kind={kind} selected={kind === current} />
      ))}
    </nav>
  );
};

export { KindFilter };
