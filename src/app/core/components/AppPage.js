import React from "react";
import { useSelector } from "react-redux";

import LoginPage from "app/scenes/login/components/LoginPage";
import * as selectors from "app/scenes/login/selectors";
import Notifications
  from "app/scenes/notifications/components/NotificationContainer";

import RoutedPage from "./RoutedPage";

const AppPage = ({ history }) => {
  const loginRequired = useSelector(selectors.loginRequired);
  return (
    loginRequired
      ? <LoginPage />
      : (
        <React.Fragment>
          <RoutedPage history={history} />
          <Notifications />
        </React.Fragment>
      )
  );
};

export default AppPage;
