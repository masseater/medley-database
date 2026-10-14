import type { Option } from "effect";

import type { PartStartLink } from "./watch-url";

type Named = Readonly<{ id: number; title: string }>;

type StaffRole = "audio" | "video" | "other";

type Credit = Readonly<{ role: StaffRole; person: Readonly<{ id: number; name: string }> }>;

type PartRow = Readonly<{
  id: number;
  position: number;
  label: string | null;
  bpm: string | null;
  bars: string | null;
  startSec: number | null;
  note: string | null;
  comment: string | null;
  song: Named | null;
  refVideo: Named | null;
  staff: readonly Credit[];
}>;

type PartColumn =
  | "position"
  | "time"
  | "material"
  | "bpm"
  | "bars"
  | "audio"
  | "video"
  | "note"
  | "comment";

type PartLine = Readonly<{ part: PartRow; start: Option.Option<PartStartLink> }>;

const PART_COLUMN_LABEL: Readonly<Record<PartColumn, string>> = {
  position: "No.",
  time: "時間",
  material: "曲・引用元",
  bpm: "BPM",
  bars: "小節",
  audio: "音声",
  video: "映像",
  note: "備考",
  comment: "コメント",
};

const hasCredit = (part: PartRow, role: StaffRole): boolean =>
  part.staff.some((credit) => credit.role === role);

const PRESENT: Readonly<Record<PartColumn, (part: PartRow) => boolean>> = {
  position: () => true,
  time: (part) => part.startSec !== null,
  material: () => true,
  bpm: (part) => part.bpm !== null,
  bars: (part) => part.bars !== null,
  audio: (part) => hasCredit(part, "audio"),
  video: (part) => hasCredit(part, "video"),
  note: (part) => part.note !== null,
  comment: (part) => part.comment !== null,
};

const COLUMN_ORDER: readonly PartColumn[] = [
  "position",
  "time",
  "material",
  "bpm",
  "bars",
  "audio",
  "video",
  "note",
  "comment",
];

const visibleColumns = (parts: readonly PartRow[]): readonly PartColumn[] =>
  COLUMN_ORDER.filter((column) => parts.some((part) => PRESENT[column](part)));

export type { Credit, Named, PartColumn, PartLine, PartRow, StaffRole };
export { PART_COLUMN_LABEL, visibleColumns };
