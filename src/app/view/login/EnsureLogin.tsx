import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { LoginForm, LoginPage } from "@patternfly/react-core";

import { Action } from "app/actions";
import { selectors } from "app/store";
import { BackgroundImage } from "app/common/components";

const EnsureLogin = ({ children }: React.PropsWithChildren<{}>) => {
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
          data-role="login-form"
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
            dispatch<Action>({
              type: "ENTER_CREDENTIALS",
              payload: { username, password },
            });
          }}
        />
      </LoginPage>
    </>
  );
};

export default EnsureLogin;
