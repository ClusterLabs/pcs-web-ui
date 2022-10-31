import { Provider } from "react-redux";

import { setupStore } from "app/store";
import { Router } from "app/view/share";

import { EnsureLogin } from "./login";
import { AppRouter } from "./AppRouter";
import "./App.css";

export const App = ({ store = setupStore() }) => (
  <Provider store={store}>
    <EnsureLogin>
      <Router base="/ui">
        <AppRouter />
      </Router>
    </EnsureLogin>
  </Provider>
);
