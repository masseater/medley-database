import { Array as Arr } from "effect";
import type { ReactNode } from "react";

const SongAliases = ({ aliases }: Readonly<{ aliases: readonly string[] }>): ReactNode =>
  Arr.isReadonlyArrayNonEmpty(aliases) && (
    <p className="text-muted-foreground text-sm">{`別表記: ${aliases.join("、")}`}</p>
  );

export { SongAliases };
