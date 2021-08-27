import React from "react";
import { useSelector } from "react-redux";
import {
  Alert,
  LoginForm,
  LoginPage as PfLoginPage,
} from "@patternfly/react-core";

import { selectors } from "app/store";
import { BackgroundImage, useDispatch } from "app/view/share";

// WARNING: Don't inline this component inside EnsureLogin component.
// It would require put react state parts (username, password) into EnsureLogin
// component, so the state persists when this component is not rendered. When
// the login page is rendered again, previous username and login is present
// which is wrong.
export const LoginPage: React.FC = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const failed = useSelector(selectors.loginIsFailed);
  const failMessage = useSelector(selectors.loginGetFailMessage);
  const isAcceptingLoginData = useSelector(selectors.loginIsAcceptingData);
  const dispatch = useDispatch();
  return (
    <>
      <BackgroundImage />
      <PfLoginPage
        loginTitle="Please log in"
        textContent="HA Cluster Management"
      >
        {failed && <Alert variant="danger" isInline title={failMessage} />}
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
      </PfLoginPage>
    </>
  );
};
