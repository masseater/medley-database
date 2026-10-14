import type { ReactNode } from "react";

import type { PartColumn, PartLine } from "#/entities/catalog/lib/part-columns";
import { TableCell } from "#/shared/ui/table-cell";

import { PartMaterial } from "./part-material";
import { PartStaff } from "./part-staff";
import { PartStart } from "./part-start";

const CELL: Readonly<Record<PartColumn, (line: PartLine) => ReactNode>> = {
  position: (line) => line.part.position,
  time: (line) => <PartStart start={line.start} />,
  material: (line) => <PartMaterial part={line.part} />,
  bpm: (line) => line.part.bpm,
  bars: (line) => line.part.bars,
  audio: (line) => <PartStaff part={line.part} staffRole="audio" />,
  video: (line) => <PartStaff part={line.part} staffRole="video" />,
  note: (line) => line.part.note,
  comment: (line) => line.part.comment,
};

const PartCell = ({
  column,
  line,
}: Readonly<{ column: PartColumn; line: PartLine }>): ReactNode => (
  <TableCell>{CELL[column](line)}</TableCell>
);

export { PartCell };
