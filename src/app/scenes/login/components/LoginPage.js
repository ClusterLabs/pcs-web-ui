import React from "react";
import { connect } from "react-redux";
import {
  LoginForm,
  LoginPage,
} from "@patternfly/react-core";
import { BackgroundImage } from "app/components";

import * as actions from "../actions";
import * as selectors from "../reducer";

const withState = connect(
  state => ({
    failed: selectors.failed(state),
    failMessage: selectors.failMessage(state),
    isAcceptingLoginData: selectors.isAcceptingLoginData(state),
  }),
  {
    enterCredentials: actions.enterCredentials,
  },
);

const Login = ({
  failed,
  failMessage,
  isAcceptingLoginData,
  enterCredentials,
}) => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  return (
    <React.Fragment>
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
          onLoginButtonClick={() => enterCredentials(username, password)}
        />
      </LoginPage>
    </React.Fragment>
  );
};

export default withState(Login);
