import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "sqlite",
  out: "./db/migrations",
  schema: "./db/schema.ts",
  dbCredentials: {
    url: 'http://127.0.0.1:8080'
  },
  introspect: {
    casing: "camel",
  },
  migrations: {
    prefix: "timestamp",
    table: "__drizzle_migrations__",
  },
  strict: true,
  verbose: true,
});
