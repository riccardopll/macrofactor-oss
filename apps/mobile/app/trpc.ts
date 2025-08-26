import { createTRPCReact } from "@trpc/react-query";
import { httpBatchLink, loggerLink } from "@trpc/client";
import type { AppRouter } from "@macrofactor-oss/api";

export const trpc = createTRPCReact<AppRouter>();

export function createTRPCClient() {
  return trpc.createClient({
    links: [
      loggerLink({ enabled: () => __DEV__ }),
      httpBatchLink({
        url:
          (process.env.EXPO_PUBLIC_API_URL || "http://localhost:8787") +
          "/trpc",
      }),
    ],
  });
}
