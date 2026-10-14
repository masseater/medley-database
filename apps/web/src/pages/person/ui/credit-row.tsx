import type { ReactNode } from "react";

import { VideoLink } from "#/entities/catalog";
import { TableCell } from "#/shared/ui/table-cell";
import { TableRow } from "#/shared/ui/table-row";

import { CreditMaterial } from "./credit-material";

const ROLE_LABEL = { audio: "音声", video: "映像", other: "その他" } as const;

type Credit = Readonly<{
  role: keyof typeof ROLE_LABEL;
  part: Readonly<{
    position: number;
    label: string | null;
    song: Readonly<{ id: number; title: string }> | null;
    video: Readonly<{ id: number; title: string }>;
  }>;
}>;

const CreditRow = ({ credit }: Readonly<{ credit: Credit }>): ReactNode => (
  <TableRow>
    <TableCell>
      <VideoLink id={credit.part.video.id} title={credit.part.video.title} />
    </TableCell>
    <TableCell>{credit.part.position}</TableCell>
    <TableCell>
      <CreditMaterial song={credit.part.song} label={credit.part.label} />
    </TableCell>
    <TableCell>{ROLE_LABEL[credit.role]}</TableCell>
  </TableRow>
);

export { CreditRow };
