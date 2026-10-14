import { drizzleAdapter } from "@better-auth/drizzle-adapter/relations-v2";
import { mcp } from "@better-auth/mcp";
import { betterAuth } from "better-auth";
import { jwt } from "better-auth/plugins";
import { tanstackStartCookies } from "better-auth/tanstack-start";
import { env } from "cloudflare:workers";

import { MCP_URL, SITE_ORIGIN } from "#/shared/config";
import { db } from "#/shared/db/index.server";

import {
  account,
  authRelations,
  jwks,
  oauthAccessToken,
  oauthClient,
  oauthClientAssertion,
  oauthClientResource,
  oauthConsent,
  oauthRefreshToken,
  oauthResource,
  session,
  user,
  verification,
} from "./generated/auth.table";

const auth = betterAuth({
  baseURL: SITE_ORIGIN,
  database: drizzleAdapter(db, {
    provider: "sqlite",
    schema: {
      account,
      authRelations,
      jwks,
      oauthAccessToken,
      oauthClient,
      oauthClientAssertion,
      oauthClientResource,
      oauthConsent,
      oauthRefreshToken,
      oauthResource,
      session,
      user,
      verification,
    },
  }),
  disabledPaths: ["/token"],
  emailAndPassword: { enabled: true, disableSignUp: true },
  plugins: [
    tanstackStartCookies(),
    jwt(),
    mcp({
      loginPage: "/sign-in",
      consentPage: "/mcp/consent",
      resource: MCP_URL,
      scopes: ["openid", "profile", "offline_access"],
      allowDynamicClientRegistration: true,
      allowUnauthenticatedClientRegistration: true,
    }),
  ],
  secret: env.BETTER_AUTH_SECRET,
});

export { auth };
