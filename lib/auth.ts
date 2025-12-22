import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

import db from "./db/index"; // your drizzle instance
import env from "./env";
export const auth = betterAuth({
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