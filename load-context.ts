import type { PlatformProxy } from "wrangler";

declare module "@remix-run/cloudflare" {
  interface AppLoadContext extends ReturnType<typeof getLoadContext> {
    // This will merge the result of `getLoadContext` into the `AppLoadContext`
    cloudflare: Cloudflare;
  }
}

type Cloudflare = Omit<PlatformProxy<Env>, "dispose">;
type GetLoadContextArgs = {
  request: Request;
  context: {
    cloudflare: Cloudflare;
  };
}

export function getLoadContext({ context }: GetLoadContextArgs) {
  return context
}
