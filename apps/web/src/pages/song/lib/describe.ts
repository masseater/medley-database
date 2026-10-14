import { Option } from "effect";

import { formatTime } from "#/entities/catalog";

type UsedAt = Readonly<{ position: number; startSec: number | null }>;

const usedAt = (part: UsedAt): string =>
  Option.match(Option.fromNullOr(part.startSec), {
    onNone: () => `No.${part.position.toString()}`,
    onSome: formatTime,
  });

const describeDirect = ({ parts }: Readonly<{ parts: readonly UsedAt[] }>): string =>
  parts.map((part) => usedAt(part)).join("、");

const describeIndirect = ({
  via,
}: Readonly<{ via: readonly Readonly<{ title: string }>[] }>): string =>
  `${via.map((source) => source.title).join("、")} 経由`;

export { describeDirect, describeIndirect };
