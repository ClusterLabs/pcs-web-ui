import React from "react";
import { useSelector } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { Switch } from "react-router";
import { renderRoutes } from "react-router-config";
import { History } from "history";

import LoginPage from "app/scenes/login/components/LoginPage";
import * as loginSelectors from "app/scenes/login/selectors";
import Notifications
  from "app/scenes/notifications/components/NotificationContainer";

import { routes } from "../plug";

const AppPage = ({ history }: { history: History }) => {
  const loginRequired = useSelector(loginSelectors.loginRequired);
  return (
    loginRequired
      ? <LoginPage />
      : (
        <>
          <ConnectedRouter history={history}>
            <Switch>
              {renderRoutes(routes)}
            </Switch>
          </ConnectedRouter>
          <Notifications />
        </>
      )
  );
};

export default AppPage;
