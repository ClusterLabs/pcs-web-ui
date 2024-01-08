import React from "react";
import {useSelector} from "react-redux";
import {Alert, LoginPage as PfLoginPage} from "@patternfly/react-core";

import {testMarks} from "app/view/dataTest";
import {selectors} from "app/store";
import {useDispatch} from "app/view/share";

import {LoginForm} from "./LoginForm";

// WARNING: Don't inline this component inside EnsureLogin component.
// It would require put react state parts (username, password) into EnsureLogin
// component, so the state persists when this component is not rendered. When
// the login page is rendered again, previous username and login is present
// which is wrong.
export const LoginPage = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const failed = useSelector(selectors.loginIsFailed);
  const failMessage = useSelector(selectors.loginGetFailMessage);
  const isAcceptingLoginData = useSelector(selectors.loginIsAcceptingData);
  const dispatch = useDispatch();
  return (
    <>
      <PfLoginPage
        loginTitle="Please log in"
        textContent="HA Cluster Management"
        style={{
          backgroundColor: "var(--pf-v5-global--BackgroundColor--dark-100)",
        }}
        {...testMarks.login.mark}
      >
        {failed && <Alert variant="danger" isInline title={failMessage} />}
        <LoginForm
          usernameValue={username}
          onChangeUsername={value => setUsername(value)}
          passwordValue={password}
          onChangePassword={value => setPassword(value)}
          isLoginButtonDisabled={!isAcceptingLoginData}
          onLoginButtonClick={e => {
            e.preventDefault();
            dispatch({
              type: "LOGIN.ENTER_CREDENTIALS",
              payload: {username, password},
            });
          }}
          {...testMarks.login.form.mark}
        />
      </PfLoginPage>
    </>
  );
};
