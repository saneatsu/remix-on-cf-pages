import { sql } from 'drizzle-orm';
import { integer,  sqliteTable, text, } from 'drizzle-orm/sqlite-core';

export const userTable = sqliteTable('user', {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  name: text('name'),
  email: text('email').notNull().unique(),
  createdAt: text("createdAt")
    .notNull()
    .default(sql`(datetime(CURRENT_TIMESTAMP, '+9 hours'))`),
  updatedAt: text("updatedAt")
    .notNull()
    .default(sql`(datetime(CURRENT_TIMESTAMP, '+9 hours'))`).$onUpdate(() => new Date().toISOString()),
});

export type InsertUser = typeof userTable.$inferInsert;
export type SelectUser = typeof userTable.$inferSelect;

export const companyTable = sqliteTable('company', {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  name: text('name').notNull().unique(),
  createdAt: text("createdAt")
    .notNull()
    .default(sql`(datetime(CURRENT_TIMESTAMP, '+9 hours'))`),
  updatedAt: text("updatedAt")
    .notNull()
    .default(sql`(datetime(CURRENT_TIMESTAMP, '+9 hours'))`).$onUpdate(() => new Date().toISOString()),
});

export type InsertCompany = typeof companyTable.$inferInsert;
export type SelectCompany = typeof companyTable.$inferSelect;
