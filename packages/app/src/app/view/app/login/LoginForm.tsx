import React from "react";
import {ActionGroup, Button, Form} from "@patternfly/react-core";

import {FormGroup, TextInput} from "app/view/share";
import {testMarks} from "app/view/dataTest";

type TextInputProps = React.ComponentProps<typeof TextInput>;
type ButtonProps = React.ComponentProps<typeof Button>;

const {form} = testMarks.login;

export const LoginForm = (props: {
  usernameValue: TextInputProps["value"];
  onChangeUsername: TextInputProps["onChange"];
  passwordValue: TextInputProps["value"];
  onChangePassword: TextInputProps["onChange"];
  isLoginButtonDisabled: ButtonProps["isDisabled"];
  onLoginButtonClick: ButtonProps["onClick"];
}) => {
  return (
    <Form {...form.mark}>
      <FormGroup
        label="Username"
        isRequired
        validated="default"
        fieldId="pf-login-username-id"
      >
        <TextInput
          autoFocus
          id="pf-login-username-id"
          isRequired
          validated="default"
          type="text"
          name="pf-login-username-id"
          value={props.usernameValue}
          onChange={props.onChangeUsername}
          {...form.username.mark}
        />
      </FormGroup>
      <FormGroup
        label="Password"
        isRequired
        validated="default"
        fieldId="pf-login-password-id"
      >
        <TextInput
          isRequired
          type={"password"}
          id="pf-login-password-id"
          name="pf-login-password-id"
          validated="default"
          value={props.passwordValue}
          onChange={props.onChangePassword}
          autoComplete="off"
          {...form.password.mark}
        />
      </FormGroup>
      <ActionGroup>
        <Button
          variant="primary"
          type="submit"
          onClick={props.onLoginButtonClick}
          isBlock
          isDisabled={props.isLoginButtonDisabled}
          {...form.login.mark}
        >
          Log In
        </Button>
      </ActionGroup>
    </Form>
  );
};
