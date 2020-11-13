import React from "react";
import { LoginForm, LoginPage } from "@patternfly/react-core";

import { selectors, useDispatch, useSelector } from "app/store";
import { BackgroundImage } from "app/view";

export const EnsureLogin = ({ children }: React.PropsWithChildren<unknown>) => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const failed = useSelector(selectors.loginIsFailed);
  const failMessage = useSelector(selectors.loginGetFailMessage);
  const isAcceptingLoginData = useSelector(selectors.loginIsAcceptingData);
  const dispatch = useDispatch();

  if (!useSelector(selectors.loginIsRequired)) {
    return <>{children}</>;
  }
  return (
    <>
      <BackgroundImage />
      <LoginPage loginTitle="Please log in" textContent="HA Cluster Management">
        {failed && (
          <form className="pf-c-form">
            <div className="pf-c-form__helper-text pf-m-error">
              {failMessage}
            </div>
          </form>
        )}
        <LoginForm
          data-test="form-login"
          usernameLabel="Username"
          usernameValue={username}
          onChangeUsername={value => setUsername(value)}
          isValidUsername
          passwordLabel="Password"
          passwordValue={password}
          onChangePassword={value => setPassword(value)}
          isValidPassword
          isLoginButtonDisabled={!isAcceptingLoginData}
          onLoginButtonClick={(e) => {
            e.preventDefault();
            dispatch({
              type: "LOGIN.ENTER_CREDENTIALS",
              payload: { username, password },
            });
          }}
        />
      </LoginPage>
    </>
  );
};
