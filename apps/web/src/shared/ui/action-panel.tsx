import { useMutation } from "@tanstack/react-query";
import { useCallback } from "react";
import type { ReactNode } from "react";

import { Button } from "./button";

const ActionPanel = ({
  title,
  label,
  done,
  failed,
  action,
}: Readonly<{
  title: string;
  label: string;
  done: string;
  failed: string;
  action: () => Promise<unknown>;
}>): ReactNode => {
  const { mutate, status } = useMutation({ mutationFn: action });
  const run = useCallback(() => {
    mutate();
  }, [mutate]);
  return (
    <section className="flex max-w-sm flex-col gap-4">
      <h1 className="text-2xl font-bold">{title}</h1>
      <Button disabled={status === "pending" || status === "success"} onClick={run}>
        {label}
      </Button>
      {status === "success" && <output>{done}</output>}
      {status === "error" && (
        <p role="alert" className="text-destructive text-sm">
          {failed}
        </p>
      )}
    </section>
  );
};

export { ActionPanel };
