import { Hono } from "hono";
import { cors } from "hono/cors";

type Env = {
  DB: D1Database;
};

const app = new Hono<{ Bindings: Env }>();

app.use("/*", cors());

app.get("/", (context) => {
  return context.json({ message: "Hello, World!" });
});

export default app;
