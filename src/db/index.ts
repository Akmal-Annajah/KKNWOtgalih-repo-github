import dotenv from "dotenv";
dotenv.config();

import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema.ts";

export const pool = new Pool({
  host: process.env.SQL_HOST,
  port: Number(process.env.SQL_PORT),
  user: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD,
  database: process.env.SQL_DB_NAME,
  connectionTimeoutMillis: 15000,
});

export const db = drizzle(pool, { schema });