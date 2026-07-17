import { pool } from "./src/db/index.ts";

async function main() {
  try {
    await pool.query("ALTER TABLE transactions ADD COLUMN reference_link TEXT DEFAULT '';");
    console.log("Added reference_link to transactions");
  } catch (e: any) {
    console.log("Transactions error (might exist):", e.message);
  }

  try {
    await pool.query("ALTER TABLE events ADD COLUMN reference_link TEXT DEFAULT '';");
    console.log("Added reference_link to events");
  } catch (e: any) {
    console.log("Events error (might exist):", e.message);
  }

  process.exit(0);
}

main();
