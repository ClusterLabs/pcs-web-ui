import React from "react";
import { createBrowserHistory } from "history";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";

import { setupStore } from "app/store";

import { Notifications } from "./notifications";
import { EnsureLogin } from "./login";
import { AppPage } from "./AppPage";
import "./App.css";


const history = createBrowserHistory({ basename: "/ui/" });

export const App = ({ store = setupStore(history) }) => (
  <Provider store={store}>
    <EnsureLogin>
      <ConnectedRouter history={history}>
        <AppPage />
      </ConnectedRouter>
      <Notifications />
    </EnsureLogin>
  </Provider>
);
