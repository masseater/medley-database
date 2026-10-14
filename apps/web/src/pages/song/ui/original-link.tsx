import type { ReactNode } from "react";

const OPEN_ORIGINAL = "原曲を開く";

const OriginalLink = ({ url }: Readonly<{ url: string | null }>): ReactNode =>
  url !== null && (
    <a href={url} target="_blank" rel="noreferrer" className="text-sm hover:underline">
      {OPEN_ORIGINAL}
    </a>
  );

export { OriginalLink };
