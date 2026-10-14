import type { ReactNode } from "react";

const Note = ({ text }: Readonly<{ text: string | null }>): ReactNode =>
  text !== null && <p className="text-sm">{text}</p>;

export { Note };
