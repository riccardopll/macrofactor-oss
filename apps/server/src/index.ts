import { Hono } from "hono";
import { cors } from "hono/cors";
import { drizzle } from "drizzle-orm/d1";
import { appRouter, type BaseContext } from "@macrofactor-oss/api";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

const app = new Hono<{
  Bindings: {
    DB: D1Database;
  };
}>();

app.use("/*", cors());

app.get("/", (ctx) => ctx.json({ message: "Hello, World!" }));

app.all("/trpc/*", (ctx) =>
  fetchRequestHandler({
    endpoint: "/trpc",
    req: ctx.req.raw,
    router: appRouter,
    createContext: () => ({ db: drizzle(ctx.env.DB) }) satisfies BaseContext,
  }),
);

export default app;
