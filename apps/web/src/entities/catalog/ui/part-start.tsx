import { Option } from "effect";
import type { ReactNode } from "react";

import type { PartStartLink } from "#/entities/catalog/lib/watch-url";

const PartStart = ({ start }: Readonly<{ start: Option.Option<PartStartLink> }>): ReactNode =>
  start.pipe(
    Option.match({
      onNone: () => false,
      onSome: (link) =>
        link.href.pipe(
          Option.match({
            onNone: () => link.label,
            onSome: (href) => (
              <a
                href={href}
                target="_blank"
                rel="noreferrer"
                className="tabular-nums hover:underline"
              >
                {link.label}
              </a>
            ),
          }),
        ),
    }),
  );

export { PartStart };
