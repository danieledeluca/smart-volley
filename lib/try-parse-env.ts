/* eslint-disable node/prefer-global/process */
import type { ZodObject, ZodRawShape } from 'zod';

import { ZodError } from 'zod';

export default function tryParseEnv<T extends ZodRawShape>(EnvSchema: ZodObject<T>, buildEnv: Record<string, string | undefined> = process.env) {
    try {
        EnvSchema.parse(buildEnv);
    } catch (err) {
        if (err instanceof ZodError) {
            let message = 'Missing required valued in .env:\n';

            err.issues.forEach((issue) => {
                message += `- ${issue.path[0].toString()}\n`;
            });

            const error = new Error(message);
            error.stack = '';

            throw error;
        } else {
            console.error(err);
        }
    }
}
