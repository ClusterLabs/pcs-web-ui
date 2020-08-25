import React from "react";
import {
  Alert,
  Button,
  EmptyState,
  EmptyStateIcon,
  Form,
  FormGroup,
  Spinner,
  TextInput,
  Title,
} from "@patternfly/react-core";

import { selectors, types, useDispatch, useSelector } from "app/store";

import { AddClusterAuthRequired } from "./AddClusterAuthRequired";

// prettier-ignore
const helperText = (
  "Enter the name of a node in a cluster that you would like to manage"
);

const authRequiredStates: types.addCluster.AUTH_STATE[] = [
  "NOT_AUTHENTICATED",
  "AUTHENTICATION_IN_PROGRESS",
  "AUTHENTICATION_FAILED",
];

export const AddClusterStepAuth = () => {
  const authState = useSelector(selectors.addClusterGetStepAuthState);
  const nodeName = useSelector(selectors.addClusterGetNodeName);
  const stateError = useSelector(selectors.addClusterGetStateError);
  const dispatch = useDispatch();
  return (
    <Form data-test="form-auth-check">
      <FormGroup
        label="Node name"
        fieldId="cluster-add-node-name"
        helperText={helperText}
      >
        <TextInput
          isRequired
          type="text"
          aria-labelledby="cluster-add-node-name"
          id="add-cluster-node-name"
          name="node-name"
          data-test="node-name"
          value={nodeName}
          onChange={currentNodeName =>
            dispatch({
              type: "ADD_CLUSTER.NODE_NAME.UPDATE",
              payload: { nodeName: currentNodeName },
            })
          }
        />
      </FormGroup>
      {authState === "INITIAL" && (
        <Button
          variant="primary"
          data-test="auth-check"
          onClick={() =>
            dispatch({
              type: "ADD_CLUSTER.CHECK_AUTH",
              payload: { nodeName },
            })
          }
          isDisabled={nodeName.length < 1}
        >
          Check authentication
        </Button>
      )}
      {authState === "CHECKING" && (
        <EmptyState style={{ margin: "auto" }}>
          <EmptyStateIcon variant="container" component={Spinner} />
          <Title size="lg" headingLevel="h3">
            Checking authentication
          </Title>
        </EmptyState>
      )}

      {authState === "ALREADY_AUTHENTICATED" && (
        <Alert
          isInline
          variant="success"
          title="Node is authenticated. You can add the cluster now."
          data-test="auth-check-success"
        />
      )}
      {authRequiredStates.includes(authState) && (
        <AddClusterAuthRequired
          nodeName={nodeName}
          authenticationInProgress={authState === "AUTHENTICATION_IN_PROGRESS"}
          authenticationError={
            authState === "AUTHENTICATION_FAILED" ? stateError : ""
          }
        />
      )}
      {authState === "ERROR" && (
        <Alert
          isInline
          variant="danger"
          title={stateError}
          data-test="auth-check-error"
        />
      )}
    </Form>
  );
};
