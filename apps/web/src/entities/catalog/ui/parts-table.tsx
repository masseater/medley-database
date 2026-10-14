import { useMemo } from "react";
import type { ReactNode } from "react";

import { visibleColumns } from "#/entities/catalog/lib/part-columns";
import type { PartLine, PartRow as Part } from "#/entities/catalog/lib/part-columns";
import { partStart } from "#/entities/catalog/lib/watch-url";
import type { Watchable } from "#/entities/catalog/lib/watch-url";
import { Table } from "#/shared/ui/table";
import { TableBody } from "#/shared/ui/table-body";

import { PartRow } from "./part-row";
import { PartsHeader } from "./parts-header";

const PartsTable = ({
  source,
  parts,
}: Readonly<{ source: Watchable; parts: readonly Part[] }>): ReactNode => {
  const columns = useMemo(() => visibleColumns(parts), [parts]);
  const lines = useMemo(
    (): readonly PartLine[] =>
      parts.map((part) => ({ part, start: partStart({ source, startSec: part.startSec }) })),
    [parts, source],
  );
  return (
    <Table>
      <PartsHeader columns={columns} />
      <TableBody>
        {lines.map((line) => (
          <PartRow key={line.part.id} line={line} columns={columns} />
        ))}
      </TableBody>
    </Table>
  );
};

export { PartsTable };
