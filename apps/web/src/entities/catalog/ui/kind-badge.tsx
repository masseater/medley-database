import type { ReactNode } from "react";

import { VIDEO_KIND_LABEL } from "#/entities/catalog/lib/video-kind";
import type { VideoKind } from "#/entities/catalog/lib/video-kind";
import { Badge } from "#/shared/ui/badge";

const KindBadge = ({ kind }: Readonly<{ kind: VideoKind }>): ReactNode => (
  <Badge variant="secondary">{VIDEO_KIND_LABEL[kind]}</Badge>
);

export { KindBadge };
