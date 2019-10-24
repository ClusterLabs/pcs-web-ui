import React from "react";
import {
  Alert,
  Form,
  FormGroup,
  TextInput,
  Button,
} from "@patternfly/react-core";
import { useSelector, useDispatch } from "react-redux";

import { Spinner } from "app/common/components";

import * as selectors from "../selectors";
import { AUTH_STATE } from "../types";
import { UpdateNodeName, CheckAuth } from "../actions";
import AddClusterAuthRequired from "./AddClusterAuthRequired";

const helperText = (
  "Enter the name of a node in a cluster that you would like to manage"
);

const authRequiredStates: AUTH_STATE[] = [
  "NOT_AUTHENTICATED",
  "AUTHENTICATION_IN_PROGRESS",
  "AUTHENTICATION_FAILED",
];

const AddClusterStepAuth = () => {
  const authState = useSelector(selectors.getStepAuthState);
  const nodeName = useSelector(selectors.getNodeName);
  const stateError = useSelector(selectors.getStateError);
  const dispatch = useDispatch();
  return (
    <Form>
      <FormGroup
        label="Node name"
        fieldId="add-cluster-node-name"
        helperText={helperText}
      >
        <TextInput
          isRequired
          type="text"
          id="add-cluster-node-name"
          name="node-name"
          aria-describedby="Node name for add existing cluster operation"
          value={nodeName}
          onChange={currentNodeName => dispatch<UpdateNodeName>({
            type: "ADD_CLUSTER.NODE_NAME.UPDATE",
            payload: { nodeName: currentNodeName },
          })}
        />
      </FormGroup>
      {authState === "INITIAL" && (
        <Button
          variant="primary"
          onClick={() => dispatch<CheckAuth>({
            type: "ADD_CLUSTER.CHECK_AUTH",
            payload: { nodeName },
          })}
          isDisabled={nodeName.length < 1}
          data-role="check-node-authentication"
        >
          Check authentication
        </Button>
      )}
      {authState === "CHECKING" && (
        <Spinner text="Checking authentication" data-role="waiting-auth" />
      )}

      {authState === "ALREADY_AUTHENTICATED" && (
        <Alert
          isInline
          variant="success"
          title="Node is authenticated. You can add the cluster now."
          data-role="auth-success-message"
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
          data-role="auth-error-message"
        />
      )}
    </Form>
  );
};

export default AddClusterStepAuth;
