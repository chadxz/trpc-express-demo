import * as trpcExpress from '@trpc/server/adapters/express';

export function createContext(_opts: trpcExpress.CreateExpressContextOptions) {
  return {};
}

export type Context = Awaited<ReturnType<typeof createContext>>;
