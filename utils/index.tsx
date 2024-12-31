import { drizzle } from 'drizzle-orm/neon-http';

import dotenv from 'dotenv'

// Load environment variables from .env.local
dotenv.config({ path: '../.env.local' })

console.log(process.env.DATABASE_URL!)
//const db = drizzle(process.env.NEXT_PUBLIC_DATABASE_URL);
