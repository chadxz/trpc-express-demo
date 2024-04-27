import * as url from 'node:url';
import {createExpressMiddleware} from '@trpc/server/adapters/express';
import express from 'express';
import {z} from 'zod';
import {router, publicProcedure} from "./trpc.ts";
import {createContext} from "./context.ts";
import cors from "cors";
import {TRPCError} from "@trpc/server";

export const appRouter = router({
  getUser: publicProcedure.input(z.string()).query((opts) => {
    opts.input;
    return {id: opts.input, name: 'Bilbo'};
  }),
  createUser: publicProcedure
    .input(z.object({name: z.string().min(5)}))
    .mutation(async (_opts) => {
      throw new TRPCError({code: 'BAD_REQUEST', message: 'can only create Frodo'})
    }),
});

export type AppRouter = typeof appRouter;

export const app = express();

app.use(cors());
app.use(
  '/trpc',
  createExpressMiddleware({
    router: appRouter,
    createContext,
  }),
);

/**
 * Is this script file the main module or imported?
 */
function isMain(): boolean {
  if (!import.meta.url.startsWith('file:')) {
    return false;
  }

  const modulePath = url.fileURLToPath(import.meta.url);
  return process.argv[1] === modulePath;
}

if (isMain()) {
  console.log('Server listening at http://localhost:3000');
  app.listen(3000);
}
