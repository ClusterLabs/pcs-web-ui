import React from "react";
import {
  Alert,
  Button,
  Form,
  FormGroup,
  Switch,
  TextInput,
} from "@patternfly/react-core";

import { EmptyStateSpinner } from "app/view/emptyState";

export const NodeAuthForm: React.FC<{
  authenticationError: string;
  authenticationInProgress: boolean;
  onSend: (password: string, address: string, port: string) => void;
}> = ({ authenticationError, authenticationInProgress, onSend }) => {
  const [password, setPassword] = React.useState("");
  const [customAddrPort, setCustomAddrPort] = React.useState(false);
  const [address, setAddress] = React.useState("");
  const [port, setPort] = React.useState("");
  return (
    <Form>
      <Alert
        isInline
        variant="warning"
        title={"Node is not authenticated. Please authenticate it."}
      />
      {authenticationError && (
        <Alert
          isInline
          variant="danger"
          title={authenticationError}
          data-test="auth-error"
        />
      )}
      <FormGroup
        isRequired
        label="Password"
        fieldId="node-auth-password"
        helperText="Enter password for user 'hacluster' to authenticate node"
      >
        <TextInput
          isRequired
          type="password"
          id="node-auth-password"
          name="password"
          data-test="password"
          aria-describedby="Password for user 'hacluster' to authenticate nodes"
          value={password}
          onChange={value => setPassword(value)}
        />
      </FormGroup>
      <span data-test="use-custom-address">
        <Switch
          id="add-cluster-use-custom-address-port"
          label="Use custom address and port"
          isChecked={customAddrPort}
          onChange={() => setCustomAddrPort(!customAddrPort)}
        />
      </span>
      {customAddrPort && (
        <>
          <FormGroup
            label="Address"
            fieldId="node-auth-address"
            helperText="Enter an address via which pcsd will communicate with the node"
          >
            <TextInput
              type="text"
              id="node-auth-address"
              name="address"
              data-test="address"
              aria-describedby="An address via which pcsd will communicate with the node"
              value={address}
              onChange={value => setAddress(value)}
            />
          </FormGroup>
          <FormGroup
            label="Port"
            fieldId="node-auth-port"
            helperText="Enter a port via which pcsd will communicate with the node"
          >
            <TextInput
              type="text"
              id="node-auth-port"
              name="port"
              data-test="port"
              aria-describedby="A port via which pcsd will communicate with the node"
              value={port}
              onChange={value => setPort(value)}
            />
          </FormGroup>
        </>
      )}
      {authenticationInProgress ? (
        <EmptyStateSpinner title="Authenticating node" />
      ) : (
        <Button
          variant="primary"
          onClick={() => onSend(password, address, port)}
          data-test="auth-node"
        >
          Authenticate node
        </Button>
      )}
    </Form>
  );
};
