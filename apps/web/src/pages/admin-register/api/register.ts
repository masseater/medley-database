import { Effect, String } from "effect";

import { authClient, requireAuthSuccess } from "#/shared/auth";

const FRAGMENT_MARK = "#";

const inviteFromLocation = (): string =>
  String.replace(FRAGMENT_MARK, "")(globalThis.location.hash);

const registerPasskey = (): Promise<unknown> =>
  Effect.runPromise(
    Effect.promise(() =>
      authClient.passkey.addPasskey({ context: inviteFromLocation(), createSession: true }),
    ).pipe(Effect.flatMap(requireAuthSuccess)),
  );

export { registerPasskey };
