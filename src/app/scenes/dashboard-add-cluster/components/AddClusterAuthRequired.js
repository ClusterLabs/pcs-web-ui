import React from "react";
import { useDispatch } from "react-redux";
import {
  Button,
  FormGroup,
  Switch,
  TextInput,
} from "@patternfly/react-core";

import { Spinner, InlineAlert } from "app/components";

import { actionTypes } from "../types";

const { AUTHENTICATE_NODE } = actionTypes;

const AddClusterAuthRequired = ({
  nodeName,
  authenticationInProgress,
  authenticationError,
}) => {
  const [password, setPassword] = React.useState("");
  const [customAddrPort, setCustomAddrPort] = React.useState(false);
  const [address, setAddress] = React.useState("");
  const [port, setPort] = React.useState("");
  const dispatch = useDispatch();
  return (
    <React.Fragment>
      <InlineAlert
        variant="warning"
        title={
          `Node '${nodeName}' is not authenticated. Please authenticate it.`
        }
      />
      {authenticationError && (
        <InlineAlert
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
        <React.Fragment>
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
        </React.Fragment>
      )}
      {
        authenticationInProgress
          ? <Spinner text="Authenticating node" />
          : (
            <Button
              variant="primary"
              onClick={() => dispatch({
                type: AUTHENTICATE_NODE,
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
    </React.Fragment>
  );
};

export default AddClusterAuthRequired;
