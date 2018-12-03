import React from "react";
import { withStateHandlers } from "recompose";
import {
  LoginForm,
  LoginPage,
  BackgroundImage,
} from "@patternfly/react-core";

const withCredentials = withStateHandlers(
  () => ({
    username: "",
    password: "",
  }),
  {
    setUsername: () => value => ({ username: value }),
    setPassword: () => value => ({ password: value }),
  },
);


const Login = ({
  username,
  password,
  setUsername,
  setPassword,
  login,
  actions,
}) => (
  <React.Fragment>
    <BackgroundImage src={{}} />
    <LoginPage
      loginTitle="Please log in"
      textContent="HA Cluster Management"
    >
      {
        typeof login.failed === "object"
        &&
        (
          <form className="pf-c-form">
            <div className="pf-c-form__helper-text pf-m-error">
              {
                login.failed.badCredentials
                  ? "The username or password you entered is incorect"
                  : login.failed.message
              }
            </div>
          </form>
        )
      }
      <LoginForm
        usernameLabel="Username"
        usernameValue={username}
        onChangeUsername={value => setUsername(value)}
        isValidUsername
        passwordLabel="Password"
        passwordValue={password}
        onChangePassword={value => setPassword(value)}
        isValidPassword
        isLoginButtonDisabled={!login.acceptLoginData}
        onLoginButtonClick={() => actions.enterCredentials(username, password)}
      />
    </LoginPage>
  </React.Fragment>
);

export default withCredentials(Login);
