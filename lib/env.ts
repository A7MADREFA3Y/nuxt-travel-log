import { z } from "zod";

import tryParseEnv from "./try-parse-env";
const EnvSchema = z.object({
    NODE_ENV: z.string(),
    TURSO_DATABASE_URL: z.string(),
    TURSO_AUTH_TOKEN: z.string(),
    BETTER_AUTH_SECRET: z.string(),
    BETTER_AUTH_URL: z.string(),
    CLIENT_ID_GITHUB: z.string(),
    CLIENT_SECRET_GITHUB: z.string(),
})

export type EnvSchema = z.infer<typeof EnvSchema>;

tryParseEnv(EnvSchema);

// eslint-disable-next-line node/no-process-env
export default EnvSchema.parse(process.env);


// 1:10:45