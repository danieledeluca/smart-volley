import z from 'zod';

import tryParseEnv from './try-parse-env';

const EnvSchema = z.object({
    NODE_ENV: z.string(),
    DATABASE_URL: z.string(),
    DIRECT_URL: z.string(),
    SUPABASE_URL: z.url(),
    SUPABASE_KEY: z.string(),
});

export type EnvSchema = z.infer<typeof EnvSchema>;

tryParseEnv(EnvSchema);

// eslint-disable-next-line node/prefer-global/process
export default EnvSchema.parse(process.env);
