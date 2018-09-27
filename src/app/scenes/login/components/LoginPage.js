import React, { Component } from "react";
import {
  Button, Form, Message, Container, Header, Segment, Menu,
} from "semantic-ui-react";

class Login extends Component {
  state = {
    username: "",
    password: "",
  }
  render() {
    const { login, actions } = this.props;
    return (
      <React.Fragment>
        <Menu inverted />
        <Container>
          <Header>HA Cluster Configuration</Header>
          {
            typeof login.failed === "object"
            &&
            <Message negative>
              {
                login.failed.badCredentials
                  ? "Bad username or password"
                  : login.failed.message
              }
            </Message>
          }
          {
            login.logoutApplied
            &&
            <Message success>You have been successfully logged out</Message>
          }
          <Segment data-role="login-prompt">
            <Form>
              <Form.Input
                type="text"
                label="Username"
                name="username"
                value={this.state.username}
                onChange={e => this.setState({ username: e.target.value })}
              />
              <Form.Input
                type="password"
                label="Password"
                name="password"
                value={this.state.password}
                onChange={e => this.setState({ password: e.target.value })}
              />
            </Form>
            <Button
              type="submit"
              name="login"
              onClick={() => actions.enterCredentials(
                this.state.username,
                this.state.password,
              )}
              positive
              labelPosition="right"
              icon="checkmark"
              content="Login"
              disabled={!login.acceptLoginData}
              loading={!login.acceptLoginData}
            />
          </Segment>
        </Container>
      </React.Fragment>
    );
  }
}

export default Login;
