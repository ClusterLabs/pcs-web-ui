import React from 'react';

import RoutedPage from "app/core/components/RoutedPage.js";
import LoginPage from "app/scenes/login/components/LoginPage.js"
import LoginDialog from "app/scenes/login/components/LoginDialog.js"
import NotificationContainer
  from "app/scenes/notifications/containers/NotificationContainer.js"
;

import '../css/App.css';

const AppPage = ({history, login, loginActions}) => (
  (login.required && ! login.verified)
    ? <LoginPage login={login} actions={loginActions}/>
    : (
      <React.Fragment>
        <RoutedPage history={history}/>
        <LoginDialog login={login} actions={loginActions}/>
        <NotificationContainer/>
      </React.Fragment>
    )
);

export default AppPage;
