import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

import * as schema from '../db/schema';
import env from '../env';

const sql = neon(env.DATABASE_URL);
const db = drizzle({
    client: sql,
    casing: 'snake_case',
    schema,
});

export default db;
