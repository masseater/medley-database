import { Effect } from "effect";

import { authClient, requireAuthSuccess } from "#/shared/auth";

const signInWithPasskey = (): Promise<unknown> =>
  Effect.runPromise(
    Effect.promise(() => authClient.signIn.passkey({ autoFill: false })).pipe(
      Effect.flatMap(requireAuthSuccess),
    ),
  );

export { signInWithPasskey };
