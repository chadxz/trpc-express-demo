/**
 * HMR entrypoint for vite-node.
 * https://gist.github.com/cpojer/b07a7b512f03c0b1692e35dfb94da90b
 */
type TeardownCallback = () => Promise<void>;
type Listener = () => TeardownCallback;

declare global {
  // eslint-disable-next-line no-var
  // noinspection ES6ConvertVarToLetConst
  var __HMR__: {
    listeners: ReadonlyArray<Listener>;
    teardownCallbacks: ReadonlyArray<TeardownCallback>;
  };
}

const key = '__HMR__';

export function register(listener: Listener) {
  if (import.meta.hot) {
    import.meta.hot.accept(async () => {
      const hmr = global[key];
      const teardownCallbacks = hmr.teardownCallbacks.map((fn) => fn());
      hmr.teardownCallbacks = [];
      await Promise.all(teardownCallbacks);
      hmr.teardownCallbacks = hmr.listeners.map((listener) => listener());
      hmr.listeners = [];
    });
  } else {
    listener();
    return;
  }

  if (!global[key]) {
    const teardown = listener();
    Object.defineProperty(global, key, {
      value: {
        listeners: [],
        teardownCallbacks: [teardown],
      },
    });
  } else {
    global[key].listeners = [...global[key].listeners, listener];
  }
}
