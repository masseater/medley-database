import { Option } from "effect";
import type { ReactNode } from "react";

import { watchUrl } from "#/entities/catalog";

type Watchable = Readonly<{ videoId: string | null; url: string }>;

const WatchLink = ({ video }: Readonly<{ video: Watchable }>): ReactNode =>
  Option.match(watchUrl({ target: video, start: Option.none() }), {
    onNone: () => false,
    onSome: (href) => (
      <a href={href} target="_blank" rel="noreferrer" className="text-sm hover:underline">
        {video.videoId ?? href}
      </a>
    ),
  });

export { WatchLink };
