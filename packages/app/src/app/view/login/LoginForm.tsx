import React from "react";
import {
  ActionGroup,
  Button,
  Form,
  FormGroup,
  TextInput,
} from "@patternfly/react-core";

type TextInputProps = React.ComponentProps<typeof TextInput>;
type ButtonProps = React.ComponentProps<typeof Button>;

export const LoginForm = (props: {
  usernameValue: TextInputProps["value"];
  onChangeUsername: TextInputProps["onChange"];
  passwordValue: TextInputProps["value"];
  onChangePassword: TextInputProps["onChange"];
  isLoginButtonDisabled: ButtonProps["isDisabled"];
  onLoginButtonClick: ButtonProps["onClick"];
}) => {
  return (
    <Form>
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
          autoComplete="off"
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
        />
      </FormGroup>
      <ActionGroup>
        <Button
          variant="primary"
          type="submit"
          onClick={props.onLoginButtonClick}
          isBlock
          isDisabled={props.isLoginButtonDisabled}
        >
          Log In
        </Button>
      </ActionGroup>
    </Form>
  );
};
