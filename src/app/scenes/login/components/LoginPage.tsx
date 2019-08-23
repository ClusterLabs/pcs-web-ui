import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  LoginForm,
  LoginPage,
} from "@patternfly/react-core";
import { BackgroundImage } from "app/components";

import { LoginActionType } from "../types";
import { EnterCredentials } from "../actions";
import * as selectors from "../selectors";

const Login = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const failed = useSelector(selectors.failed);
  const failMessage = useSelector(selectors.failMessage);
  const isAcceptingLoginData = useSelector(selectors.isAcceptingLoginData);
  const dispatch = useDispatch();
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
            dispatch<EnterCredentials>({
              type: LoginActionType.ENTER_CREDENTIALS,
              payload: { username, password },
            });
          }}
        />
      </LoginPage>
    </>
  );
};

export default Login;
