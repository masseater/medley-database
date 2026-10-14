import type { CallToolResult } from "@modelcontextprotocol/server";
import { Effect, Option, Predicate } from "effect";

import { runRequest } from "#/shared/observability/index.server";

import { ToolError } from "./tool-error";

const UNKNOWN_FAILURE = "database rejected the change";

const jsonResult = (value: unknown): CallToolResult => ({
  content: [{ type: "text", text: JSON.stringify(value) }],
});

const errorResult = ({ message }: Readonly<{ message: string }>): CallToolResult => ({
  content: [{ type: "text", text: message }],
  isError: true,
});

const runTool = <Value>(effect: Effect.Effect<Value, ToolError>): Promise<CallToolResult> =>
  runRequest(effect.pipe(Effect.match({ onFailure: errorResult, onSuccess: jsonResult })));

const messageOf = (cause: unknown): string =>
  Option.liftPredicate(cause, Predicate.isError).pipe(
    Option.match({ onNone: () => UNKNOWN_FAILURE, onSome: (error) => error.message }),
  );

const query = <Row>(run: () => Promise<Row>): Effect.Effect<Row, ToolError> =>
  Effect.tryPromise({ try: run, catch: (cause) => new ToolError({ message: messageOf(cause) }) });

const orMissing =
  (missing: string) =>
  <Value, Failure>(
    effect: Effect.Effect<Option.Option<Value>, Failure>,
  ): Effect.Effect<Value, Failure | ToolError> =>
    effect.pipe(
      Effect.flatMap(
        Option.match({
          onNone: () => Effect.fail(new ToolError({ message: missing })),
          onSome: (value) => Effect.succeed(value),
        }),
      ),
    );

export { orMissing, query, runTool };
