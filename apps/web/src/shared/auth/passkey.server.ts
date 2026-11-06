import { passkey } from "@better-auth/passkey";
import { run } from "@r_masseater/workers-tracing/effect";
import { APIError } from "better-auth/api";
import { generateRandomString, verifyPassword } from "better-auth/crypto";
import { Effect, Option } from "effect";

import { SITE_NAME, SITE_ORIGIN } from "#/shared/config";

const ADMIN_INVITE_HASH =
  "0783be06da583619492f48ab0b63cf28:321e2a524c933faa5d97530e7ff2498507de79ce6ed3e708dd5ccf686b176076c86eedd68415c65a4a060de0a2d3db814e60922aed2261e693706e31a32e1dc4";

const ADMIN_NAME = "管理者";

const PENDING_USER_ID_LENGTH = 32;

const NO_PASSKEYS = 0;

const UNDELIVERABLE_EMAIL_DOMAIN = "passkey.invalid";

const requireAdminInvite = (
  invite: string | null | undefined,
  countPasskeys: () => Promise<number>,
): Effect.Effect<void, APIError> =>
  Effect.all([
    Effect.promise(() => verifyPassword({ hash: ADMIN_INVITE_HASH, password: invite ?? "" })),
    Effect.promise(countPasskeys),
  ]).pipe(
    Effect.filterOrFail(
      ([valid, registered]) => valid && registered === NO_PASSKEYS,
      () => new APIError("FORBIDDEN", { message: "invalid_invite" }),
    ),
    Effect.asVoid,
  );

const pendingAdmin = (): { id: string; name: string } => ({
  id: generateRandomString(PENDING_USER_ID_LENGTH),
  name: ADMIN_NAME,
});

const undeliverableEmail = (userId: string): string => `${userId}@${UNDELIVERABLE_EMAIL_DOMAIN}`;

const createInvitedAdmin = (
  invite: string | null | undefined,
  countPasskeys: () => Promise<number>,
  createUser: () => Promise<{ id: string }>,
): Effect.Effect<{ userId: string }, APIError> =>
  requireAdminInvite(invite, countPasskeys).pipe(
    Effect.andThen(Effect.promise(createUser)),
    Effect.map(({ id }) => ({ userId: id })),
  );

const adminPasskey = passkey({
  rpName: SITE_NAME,
  origin: SITE_ORIGIN,
  registration: {
    requireSession: false,
    resolveUser: ({ ctx, context }) =>
      run(
        requireAdminInvite(context, () => ctx.context.adapter.count({ model: "passkey" })).pipe(
          Effect.map(pendingAdmin),
        ),
      ),
    afterVerification: ({ ctx, user, context }) =>
      run(
        Effect.promise(() => ctx.context.internalAdapter.findUserById(user.id)).pipe(
          Effect.flatMap((existing) =>
            Option.match(Option.fromNullishOr(existing), {
              onNone: () =>
                createInvitedAdmin(
                  context,
                  () => ctx.context.adapter.count({ model: "passkey" }),
                  () =>
                    ctx.context.internalAdapter.createUser(
                      { name: ADMIN_NAME, email: undeliverableEmail(user.id) },
                      { method: "passkey" },
                    ),
                ),
              onSome: () => Effect.succeed({}),
            }),
          ),
        ),
      ),
  },
});

export { adminPasskey };
