import type { ComponentProps, ReactNode } from "react";

import { cn } from "#/shared/lib/utils";

const TableCell = ({ className, ...props }: ComponentProps<"td">): ReactNode => (
  <td data-slot="table-cell" className={cn("p-2 align-middle", className)} {...props} />
);

export { TableCell };
