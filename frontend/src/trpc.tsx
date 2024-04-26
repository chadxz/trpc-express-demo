import {httpBatchLink} from '@trpc/client';
import type {AppRouter} from "#backend/server.ts";
import {createTRPCReact} from "@trpc/react-query";
import React, {useState} from "react";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

export const trpc = createTRPCReact<AppRouter>();

export const client = trpc.createClient({
  links: [
    httpBatchLink({
      url: 'http://localhost:3000/trpc',
    }),
  ],
});

export function TRPCProvider({children}: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() => client);
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </trpc.Provider>
  );
}
