import React from "react";
import { useSelector } from "react-redux";

import { selectors } from "app/store";

import { LoginPage } from "./LoginPage";

export const EnsureLogin = ({ children }: React.PropsWithChildren<unknown>) => {
  if (!useSelector(selectors.loginIsRequired)) {
    return <>{children}</>;
  }
  // WARNING: Don't inline LoginPage inside this component.
  // It would require put react state parts (username, password) from LoginPage
  // here, so the state persists when LoginPage is not rendered. When the login
  // page is rendered again, previous username and login is present which is
  // wrong.
  return <LoginPage />;
};
