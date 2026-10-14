import { Data } from "effect";

class ToolError extends Data.TaggedError("ToolError")<{ readonly message: string }> {}

export { ToolError };
