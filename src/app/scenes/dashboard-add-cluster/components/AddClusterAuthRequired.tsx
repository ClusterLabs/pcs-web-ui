import React from "react";
import { useDispatch } from "react-redux";
import {
  Button,
  FormGroup,
  Switch,
  TextInput,
  Alert,
} from "@patternfly/react-core";

import { Spinner } from "app/common/components";

import { AuthenticateNode } from "../actions";
import { NodeName, StateError } from "../types";

const AddClusterAuthRequired = (
  { nodeName, authenticationInProgress, authenticationError }: {
    nodeName: NodeName,
    authenticationInProgress: boolean,
    authenticationError: StateError,
  },
) => {
  const [password, setPassword] = React.useState("");
  const [customAddrPort, setCustomAddrPort] = React.useState(false);
  const [address, setAddress] = React.useState("");
  const [port, setPort] = React.useState("");
  const dispatch = useDispatch();
  return (
    <>
      <Alert
        isInline
        variant="warning"
        title={
          `Node '${nodeName}' is not authenticated. Please authenticate it.`
        }
      />
      {authenticationError && (
        <Alert
          isInline
          variant="danger"
          title={authenticationError}
          data-role="authentication-failed"
        />
      )}
      <FormGroup
        data-role="auth-form"
        isRequired
        label="Password"
        fieldId="add-cluster-password"
        helperText="Enter password for user 'hacluster' to authenticate nodes"
      >
        <TextInput
          isRequired
          type="password"
          id="add-cluster-password"
          name="password"
          aria-describedby="Password for user 'hacluster' to authenticate nodes"
          value={password}
          onChange={value => setPassword(value)}
        />
      </FormGroup>
      <Switch
        id="add-cluster-use-custom-address-port"
        label="Use custom address and port"
        isChecked={customAddrPort}
        onChange={() => setCustomAddrPort(!customAddrPort)}
        aria-label="Use custom address and port switch"
      />
      { customAddrPort && (
        <>
          <FormGroup
            label="Address"
            fieldId="add-cluster-address"
            helperText="Enter an address via which pcsd will communicate with the node"
          >
            <TextInput
              type="text"
              id="add-cluster-address"
              name="address"
              aria-describedby="An address via which pcsd will communicate with the node"
              value={address}
              onChange={value => setAddress(value)}
            />
          </FormGroup>
          <FormGroup
            label="Port"
            fieldId="add-cluster-port"
            helperText="Enter a port via which pcsd will communicate with the node"
          >
            <TextInput
              type="text"
              id="add-cluster-port"
              name="port"
              aria-describedby="A port via which pcsd will communicate with the node"
              value={port}
              onChange={value => setPort(value)}
            />
          </FormGroup>
        </>
      )}
      {
        authenticationInProgress
          ? <Spinner text="Authenticating node" />
          : (
            <Button
              variant="primary"
              onClick={() => dispatch<AuthenticateNode>({
                type: "ADD_CLUSTER.AUTHENTICATE_NODE",
                payload: {
                  nodeName,
                  password,
                  address,
                  port,
                },
              })}
              data-role="authenticate-node"
            >
              Authenticate node
            </Button>

          )
      }
    </>
  );
};

export default AddClusterAuthRequired;
