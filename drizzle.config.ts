import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';
import dotenv from 'dotenv'

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' })

export default defineConfig({
  out: './drizzle',
  schema: './utils/schema.tsx',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
