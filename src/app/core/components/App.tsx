import React from "react";
import { createBrowserHistory } from "history";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";

import { EnsureLogin } from "app/scenes/login";
import { Notifications } from "app/scenes/notifications/";

import { setupStore } from "app/store";
import AppPage from "./AppPage";
import "../css/App.css";


const history = createBrowserHistory({ basename: "/ui/" });

const App = ({ store = setupStore(history) }) => (
  <Provider store={store}>
    <EnsureLogin>
      <ConnectedRouter history={history}>
        <AppPage />
      </ConnectedRouter>
      <Notifications />
    </EnsureLogin>
  </Provider>
);

export default App;
