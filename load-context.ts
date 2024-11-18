import { createClient } from "@libsql/client/web";
import { PrismaLibSQL } from "@prisma/adapter-libsql";
import { PrismaClient } from "@prisma/client";
import type { PlatformProxy } from "wrangler";

type GetLoadContextArgs = {
  request: Request;
  context: {
    cloudflare: Omit<PlatformProxy<Env>, "dispose" | "caches" | "cf"> & {
      caches: PlatformProxy<Env>["caches"] | CacheStorage;
      cf: Request["cf"];
    };
    db: PrismaClient<{ adapter: PrismaLibSQL }>;
  };
};

declare module "@remix-run/cloudflare" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface AppLoadContext extends ReturnType<typeof getLoadContext> {
    // This will merge the result of `getLoadContext` into the `AppLoadContext`
    cloudflare: Cloudflare;
    db: PrismaClient<{ adapter: PrismaLibSQL }>;
  }
}

export function getLoadContext({ context }: GetLoadContextArgs) {
  const url = context.cloudflare.env.TURSO_URL.trim();
	const authToken = context.cloudflare.env.TURSO_AUTH_TOKEN.trim();

  if (!url) {
    throw new Error("TURSO_URL is required");
  }

  if (!authToken) {
    throw new Error("TURSO_AUTH_TOKEN is required");
  }

  const libsql = createClient({ url, authToken });
	const adapter = new PrismaLibSQL(libsql);
	const client = new PrismaClient({ adapter });

  return {
    ...context,
    db: client
  }
}
