import type { Option } from "effect";
import type { ReactNode } from "react";

import type { PartRow } from "#/entities/catalog/lib/part";
import type { PartStartLink } from "#/entities/catalog/lib/watch-url";

import { PositionMark } from "./position-mark";
import { SetlistBody } from "./setlist-body";

const SetlistItem = ({
  part,
  start,
}: Readonly<{ part: PartRow; start: Option.Option<PartStartLink> }>): ReactNode => (
  <li className="bg-card hover:border-primary flex gap-3 rounded-lg border p-3 transition-colors sm:gap-4 sm:p-4">
    <PositionMark position={part.position} />
    <SetlistBody part={part} start={start} />
  </li>
);

export { SetlistItem };
