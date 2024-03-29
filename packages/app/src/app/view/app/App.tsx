import {Provider} from "react-redux";

import {setupStore} from "app/store";
import {Router} from "app/view/share";
import {TaskContainer} from "app/view/task";

import {EnsureLogin} from "./login";
import {EnsurePermissions} from "./EnsurePermissions";
import {AppRouter} from "./AppRouter";
import "./App.css";

export const App = ({
  store = setupStore(),
}: {
  store?: ReturnType<typeof setupStore>;
}) => (
  <Provider store={store}>
    <EnsureLogin>
      <EnsurePermissions>
        <Router base="/ui">
          <TaskContainer />
          <AppRouter />
        </Router>
      </EnsurePermissions>
    </EnsureLogin>
  </Provider>
);
