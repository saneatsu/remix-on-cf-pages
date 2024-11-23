# Remix + Cloudflare Pages for comparison Prisma and Drizzle

for Cloudflare Workers: https://github.com/saneatsu/remix-on-cf-worker

## Background

While developing with Remix and Cloudflare Pages, we encountered a phenomenon where TTFB took more than 4 seconds.

The cause may be that Prisma is used as an ORM, so we measured TTFB using Prisma and Drizzle.

## Development

Run the dev server with using `.env.development`

```sh
pnpm run dev
```

To run Wrangler:

```sh
npm run build
npm start
```

## Deployment

First, edit `.env.production` for using Turso.

```.env.production
VITE_TURSO_URL=libsql://.turso.io
VITE_TURSO_AUTH_TOKEN=eyJxxx
```

Deploy.

```sh
pnpm run deploy
```

## Result

Page URL for measurement.

| URL                    | Detail                                            | 
| ---------------------- | ----------------------------------------------- | 
| `/json-placeholder-200`  | Get 200 ToDo items from JSON Placeholder.     | 
| `/json-placeholder-1000` | Get 1,000 ToDo items from JSON Placeholder.    | 
| `/db-connect`            | Get 5 cases each from 2 tables in Turso(DB), 10 cases in total. | 


### TTFB

TTFB was measured five times using Lighthouse.

| ORM package | URL                    | TTFB               | 
| ----------- | ---------------------- | ------------------ | 
| Prisma      | `/json-placeholder-200`  | 230 - 430ms        | 
| Prisma      | `/json-placeholder-1000` | 500 - 600ms        | 
| Prisma      | `/db-connect`            | **1970 - 2210 ms** | 
| Drizzle     | `/db-connect`            | **1020 - 1210 ms** | 

### Application Size

The following commands were used to measure the size of the application.

```sh
npx wrangler deploy 'functions/[[path]].ts' --outdir bundled/ --dry-run
```

| Status                                   | Size (gzip) |
| ---------------------------------------- | ----------- |
| Immediately after creating | 350 KiB     |
| Add Prisma                     | 1202.67 KiB |
| Add Drizzle                  | 417.39 KiB  | 

The size of Prisma is **852 KiB** (1202 - 350) and the size of Drizzle is **67 KiB** (417 - 350).

### Conclusion
By adopting Drizzle, TTFB was reduced by about 1000 ms.

In addition, when Prisma was used, TTFB was 1202KiB, which exceeded the [1MB limit of the free version of Cloudflare Worker](https://developers.cloudflare.com/workers/platform/limits/), which was avoided by using Drizzle.
