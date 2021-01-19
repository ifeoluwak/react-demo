import React from "react";
import { getPersistor } from "@rematch/persist";
import { PersistGate } from "redux-persist/lib/integration/react";
import { Provider } from "react-redux";

import store from "./redux/store";
import "./scss/app.scss";

import Home from "./home";

const persistor = getPersistor();

const App = () => (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <Home />
    </PersistGate>
  </Provider>
);

export default App;
