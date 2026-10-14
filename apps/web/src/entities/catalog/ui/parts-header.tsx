import type { ReactNode } from "react";

import { PART_COLUMN_LABEL } from "#/entities/catalog/lib/part-columns";
import type { PartColumn } from "#/entities/catalog/lib/part-columns";
import { TableHead } from "#/shared/ui/table-head";
import { TableHeader } from "#/shared/ui/table-header";
import { TableRow } from "#/shared/ui/table-row";

const PartsHeader = ({ columns }: Readonly<{ columns: readonly PartColumn[] }>): ReactNode => (
  <TableHeader>
    <TableRow>
      {columns.map((column) => (
        <TableHead key={column}>{PART_COLUMN_LABEL[column]}</TableHead>
      ))}
    </TableRow>
  </TableHeader>
);

export { PartsHeader };
