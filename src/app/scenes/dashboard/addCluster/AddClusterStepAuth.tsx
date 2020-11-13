import React from "react";
import {
  Alert,
  Button,
  Form,
  FormGroup,
  TextInput,
} from "@patternfly/react-core";

import { selectors, types, useDispatch, useSelector } from "app/store";
import { EmptyStateSpinner, NodeAuthForm } from "app/view";

const helperText =
  "Enter the name of a node in a cluster that you would like to manage";

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
    <>
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
                type: "CLUSTER.ADD.NODE_NAME.UPDATE",
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
                type: "CLUSTER.ADD.CHECK_AUTH",
                payload: { nodeName },
              })
            }
            isDisabled={nodeName.length < 1}
          >
            Check authentication
          </Button>
        )}
        {authState === "CHECKING" && (
          <EmptyStateSpinner title="Checking authentication" />
        )}

        {authState === "ALREADY_AUTHENTICATED" && (
          <Alert
            isInline
            variant="success"
            title="Node is authenticated. You can add the cluster now."
            data-test="auth-check-success"
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
      {authRequiredStates.includes(authState) && (
        <NodeAuthForm
          authenticationInProgress={authState === "AUTHENTICATION_IN_PROGRESS"}
          authenticationError={
            authState === "AUTHENTICATION_FAILED" ? stateError : ""
          }
          onSend={(password: string, address: string, port: string) =>
            dispatch({
              type: "CLUSTER.ADD.AUTH_NODE",
              payload: {
                nodeName,
                password,
                address,
                port,
              },
            })
          }
        />
      )}
    </>
  );
};
