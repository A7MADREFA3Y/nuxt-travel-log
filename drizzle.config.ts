import "dotenv/config"
import { defineConfig } from "drizzle-kit"
import env from "./lib/env"

export default defineConfig({
    out: "./lib/db/migration",
    schema: "./lib/db/schema/index.ts",
    dialect: "turso",  // ← Use "turso" for Turso/LibSQL remote DB
    casing: "snake_case",
    dbCredentials: {
        url: env.TURSO_DATABASE_URL,
        authToken: env.TURSO_AUTH_TOKEN,  // Always required for Turso
    }
})
