import persistPlugin from "@rematch/persist";
import loadingPlugin from "@rematch/loading";
import { init } from "@rematch/core";

import * as models from "../models";
import { persistConfig } from "../persist";

const store = init({
  models,
  plugins: [loadingPlugin(), persistPlugin(persistConfig)],
});

export default store;
