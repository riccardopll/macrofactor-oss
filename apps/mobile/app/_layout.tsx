import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { Slot } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { createTRPCClient, trpc } from "./trpc";

export default function RootLayout() {
  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;
  const [queryClient] = React.useState(() => new QueryClient());
  const [client] = React.useState(() => createTRPCClient());
  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <trpc.Provider client={client} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          <Slot />
        </QueryClientProvider>
      </trpc.Provider>
    </ClerkProvider>
  );
}
