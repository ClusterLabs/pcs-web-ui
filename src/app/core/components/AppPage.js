import React from "react";
import { connect } from "react-redux";

import LoginPage from "app/scenes/login/components/LoginPage";
import * as selectors from "app/scenes/login/reducer";
import Notifications
  from "app/scenes/notifications/containers/NotificationContainer";

import RoutedPage from "./RoutedPage";

const withLoginRequirement = connect(
  state => ({
    loginRequired: selectors.loginRequired(state),
  }),
);

const AppPage = ({ history, loginRequired }) => (
  loginRequired
    ? <LoginPage />
    : (
      <React.Fragment>
        <RoutedPage history={history} />
        <Notifications />
      </React.Fragment>
    )
);

export default withLoginRequirement(AppPage);
