import {app} from "./server";
import {register} from "./hmr";

register(() => {
  const port = 3000;
  console.log(`Listening on http://localhost:${port}`);
  const server = app.listen(port);
  return () => new Promise((resolve) => server.close(() => resolve()));
});
