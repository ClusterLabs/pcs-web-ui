import React from "react";
import {
  Alert,
  Button,
  EmptyState,
  EmptyStateIcon,
  FormGroup,
  Spinner,
  Switch,
  TextInput,
  Title,
} from "@patternfly/react-core";

import { types, useDispatch } from "app/store";

export const AddClusterAuthRequired = ({
  nodeName,
  authenticationInProgress,
  authenticationError,
}: {
  nodeName: types.addCluster.NodeName;
  authenticationInProgress: boolean;
  authenticationError: types.addCluster.StateError;
}) => {
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
          // prettier-ignore
          `Node '${nodeName}' is not authenticated. Please authenticate it.`
        }
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
        fieldId="add-cluster-password"
        helperText="Enter password for user 'hacluster' to authenticate nodes"
      >
        <TextInput
          isRequired
          type="password"
          id="add-cluster-password"
          name="password"
          data-test="password"
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
        data-test="use-custom-address"
      />
      {customAddrPort && (
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
              data-test="address"
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
              data-test="port"
              aria-describedby="A port via which pcsd will communicate with the node"
              value={port}
              onChange={value => setPort(value)}
            />
          </FormGroup>
        </>
      )}
      {authenticationInProgress ? (
        <EmptyState style={{ margin: "auto" }}>
          <EmptyStateIcon variant="container" component={Spinner} />
          <Title size="lg" headingLevel="h3">
            Authenticating node
          </Title>
        </EmptyState>
      ) : (
        <Button
          variant="primary"
          onClick={() =>
            dispatch({
              type: "ADD_CLUSTER.AUTHENTICATE_NODE",
              payload: {
                nodeName,
                password,
                address,
                port,
              },
            })
          }
          data-test="auth-node"
        >
          Authenticate node
        </Button>
      )}
    </>
  );
};
