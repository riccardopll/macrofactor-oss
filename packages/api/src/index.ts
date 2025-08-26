import {
  initTRPC,
  type inferRouterInputs,
  type inferRouterOutputs,
} from "@trpc/server";
import { z } from "zod";
import { asc, gt } from "drizzle-orm";
import { drizzle } from "drizzle-orm/d1";
import { foodTable } from "./db/schema";
export * from "./db/schema";

export interface BaseContext {
  db: ReturnType<typeof drizzle>;
}

const trpc = initTRPC.context<BaseContext>().create();

export const router = trpc.router;
export const publicProcedure = trpc.procedure;

export const appRouter = router({
  foodList: publicProcedure
    .input(
      z
        .object({
          limit: z.number().int().positive().max(100).default(20),
          cursor: z.number().int().positive().optional(),
        })
        .optional(),
    )
    .query(async ({ ctx, input }) => {
      const { db } = ctx;
      const limit = input?.limit ?? 20;
      const cursor = input?.cursor;
      const rows = await db
        .select()
        .from(foodTable)
        .where(gt(foodTable.id, cursor ?? 0))
        .orderBy(asc(foodTable.id))
        .limit(limit + 1);
      let nextCursor: number | undefined;
      if (rows.length > limit) {
        const next = rows.pop();
        nextCursor = next!.id as number;
      }
      return { items: rows, nextCursor };
    }),
});

export type AppRouter = typeof appRouter;
export type { inferRouterInputs, inferRouterOutputs };
