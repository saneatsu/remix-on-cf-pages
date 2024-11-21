import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";

if (!import.meta.env.VITE_TURSO_URL) {
  throw new Error("🚫 VITE_TURSO_URL がありません");
}

if (!import.meta.env.VITE_TURSO_AUTH_TOKEN) {
  throw new Error("🚫 VITE_TURSO_AUTH_TOKEN がありません");
}

const client = createClient({
  url: import.meta.env.VITE_TURSO_URL,
  authToken: import.meta.env.VITE_TURSO_AUTH_TOKEN,
});

export const db = drizzle(client);
