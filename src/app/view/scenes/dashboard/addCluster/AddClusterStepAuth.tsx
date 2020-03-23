import React from "react";
import {
  Alert,
  Form,
  FormGroup,
  TextInput,
  Button,
} from "@patternfly/react-core";
import { useSelector, useDispatch } from "react-redux";

import { Action } from "app/actions";
import { types, selectors } from "app/store";
import { Spinner } from "app/view/common";

import { AddClusterAuthRequired } from "./AddClusterAuthRequired";

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
    <Form aria-label="Check node authetication form">
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
          value={nodeName}
          onChange={(currentNodeName) => dispatch<Action>({
            type: "ADD_CLUSTER.NODE_NAME.UPDATE",
            payload: { nodeName: currentNodeName },
          })}
        />
      </FormGroup>
      {authState === "INITIAL" && (
        <Button
          variant="primary"
          aria-label="Check authentication"
          onClick={() => dispatch<Action>({
            type: "ADD_CLUSTER.CHECK_AUTH",
            payload: { nodeName },
          })}
          isDisabled={nodeName.length < 1}
        >
          Check authentication
        </Button>
      )}
      {authState === "CHECKING" && <Spinner text="Checking authentication" />}

      {authState === "ALREADY_AUTHENTICATED" && (
        <Alert
          isInline
          variant="success"
          title="Node is authenticated. You can add the cluster now."
          aria-label="Success authentication check"
        />
      )}
      {
        authRequiredStates.includes(authState) && (
          <AddClusterAuthRequired
            nodeName={nodeName}
            authenticationInProgress={
              authState === "AUTHENTICATION_IN_PROGRESS"
            }
            authenticationError={
              authState === "AUTHENTICATION_FAILED"
                ? stateError
                : ""
            }
          />
        )
      }
      {authState === "ERROR" && (
        <Alert
          isInline
          variant="danger"
          title={stateError}
          aria-label="Error authentication check"
        />
      )}
    </Form>
  );
};
