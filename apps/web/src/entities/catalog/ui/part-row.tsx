import type { ReactNode } from "react";

import type { PartColumn, PartLine } from "#/entities/catalog/lib/part-columns";
import { TableRow } from "#/shared/ui/table-row";

import { PartCell } from "./part-cell";

const PartRow = ({
  line,
  columns,
}: Readonly<{ line: PartLine; columns: readonly PartColumn[] }>): ReactNode => (
  <TableRow>
    {columns.map((column) => (
      <PartCell key={column} column={column} line={line} />
    ))}
  </TableRow>
);

export { PartRow };
