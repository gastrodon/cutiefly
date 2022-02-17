import { app } from "./api.js";
import { read_entry, sync, write_entry } from "./store.js";

(async () => {
  await sync();

  app.listen(8000);
})();
