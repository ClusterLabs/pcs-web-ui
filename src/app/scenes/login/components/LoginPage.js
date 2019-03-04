import React from "react";
import {
  LoginForm,
  LoginPage,
} from "@patternfly/react-core";
import { BackgroundImage } from "app/components";

const Login = ({ login, actions }) => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  return (
    <React.Fragment>
      <BackgroundImage />
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
          onLoginButtonClick={
            () => actions.enterCredentials(username, password)
          }
        />
      </LoginPage>
    </React.Fragment>
  );
};

export default Login;
