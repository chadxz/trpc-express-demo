# trpc-demo

## setup

* `brew install proto`
* `proto use` in this repo root
* `yarn` to install packages to node_modules
* `yarn backend` to start the vite-node backend with hot reloading enabled
* `yarn frontend` to start the vite frontend with hot reloading enabled

## what's to see?

Check `backend/` for trpc-related stuff:
* [backend/context.ts][] is the function you'd use to create the base request
    context, see https://trpc.io/docs/server/context.
* [backend/server.ts][] is where the express server and trpc app router are
    built. See https://trpc.io/docs/server/routers.
* [backend/trpc.ts][] is a simple helper library for exposing trpc components
    this is where things like protected routes and middlware would also be
    exposed maybe?

On the `frontend/`, the recommended setup is defined using @tanstack/react-query.
We could forgo this and instead use Zustand and the vanilla trpc client, or adopt
the more featureful Jotai state management library which has a trpc adapter.
* [frontend/src/trpc.tsx][] contains the client setup with react-query and the
    provider needed to use the hooks.

[backend/context.ts]: backend/context.ts
[backend/server.ts]: backend/server.ts
[backend/trpc.ts]: backend/trpc.ts
[frontend/src/trpc.tsx]: frontend/src/trpc.tsx
