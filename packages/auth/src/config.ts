import type { PgTableFn } from "drizzle-orm/pg-core";
import type { DefaultSession, NextAuthConfig } from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import Discord from "next-auth/providers/discord";
import google from "next-auth/providers/google";

import { db, schema, tableCreator } from "@acme/db";

import { env } from "../env";

interface DefaultUser {
  id?: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: "admin" | "moderator" | "user";
    } & DefaultSession["user"];
  }
  interface User extends DefaultUser {
    role: "admin" | "moderator" | "user";
  }
}
type TableFnParams = Parameters<PgTableFn>;
function dumbAdapter(
  name: TableFnParams[0],
  columns: TableFnParams[1],
  extraConfig: TableFnParams[2],
) {
  switch (name) {
    case "user":
      return schema.users;
    case "account":
      return schema.accounts;
    case "session":
      return schema.sessions;
    case "verification_token":
      return schema.verificationTokens;
    default:
      return tableCreator(name, columns, extraConfig);
  }
}
export const authConfig = {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  adapter: DrizzleAdapter(db, dumbAdapter),
  trustHost: true,
  providers: [
    Discord,
    google({
      clientId: env.AUTH_GOOGLE_ID,
      clientSecret: env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    session: (opts) => {
      if (!("user" in opts)) throw "unreachable with session strategy";

      return {
        ...opts.session,
        user: {
          ...opts.session.user,
          id: opts.user.id,
          role: opts.user.role,
        },
      };
    },
  },
} satisfies NextAuthConfig;
