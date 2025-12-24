import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { createAuthMiddleware } from "better-auth/plugins";

import db from "./db/index"; // your drizzle instance
import env from "./env";
export const auth = betterAuth({
    hooks: {
    after: createAuthMiddleware(async (ctx) => {
      if (ctx.path === "/get-session") {
        if (!ctx.context.session) {
          return ctx.json({
            session: null,
            user: null,
          });
        }
        return ctx.json(ctx.context.session);
      }
    }),
  },
    database: drizzleAdapter(db, {
        provider: "sqlite",
    }),
    advanced: {
        generateId: false,
    },
    socialProviders: {
        ...(env.CLIENT_ID_GITHUB && env.CLIENT_SECRET_GITHUB && {
            github: {
                clientId: env.CLIENT_ID_GITHUB,
                clientSecret: env.CLIENT_SECRET_GITHUB,
            }
        })
    },
});