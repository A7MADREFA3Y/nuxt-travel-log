// import "dotenv/config";
// import { defineConfig } from "drizzle-kit";
//
// import env from "./lib/env";  // Changed from "~/lib/env"
//
// export default defineConfig({
//     out: "./lib/db/migration",
//     schema: "./lib/db/schema/index.ts",
//     dialect:"turso",
//     casing: "snake_case",
//     dbCredentials: {
//         url: env.TURSO_DATABASE_URL,
//         authToken: env.NODE_ENV === "development" ? undefined :  env.TURSO_AUTH_TOKEN,
//     }
//
// })

import "dotenv/config"
import { defineConfig } from "drizzle-kit"
import env from "./lib/env"

export default defineConfig({
    out: "./lib/db/migration",
    schema: "./lib/db/schema/index.ts",
    dialect: "sqlite",  // ← FIXED: "turso" → "sqlite"
    casing: "snake_case",
    dbCredentials: {
        url: env.TURSO_DATABASE_URL,
        authToken: env.TURSO_AUTH_TOKEN,  // ← FIXED: Always use token for remote
    }
})
