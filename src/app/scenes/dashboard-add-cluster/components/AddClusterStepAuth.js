import React from "react";
import {
  Form,
  FormGroup,
  TextInput,
  Button,
} from "@patternfly/react-core";
import { useSelector, useDispatch } from "react-redux";

import { Spinner, InlineAlert } from "app/components";

import { selectors } from "../plugin";
import { AUTH_STATE, ClusterAddActionTypes } from "../types";
import AddClusterAuthRequired from "./AddClusterAuthRequired";

const { UPDATE_NODE_NAME, CHECK_AUTH } = ClusterAddActionTypes;

const helperText = (
  "Enter the name of a node in a cluster that you would like to manage"
);

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
          onChange={currentNodeName => dispatch({
            type: UPDATE_NODE_NAME,
            payload: { nodeName: currentNodeName },
          })}
        />
      </FormGroup>
      {authState === AUTH_STATE.INITIAL && (
        <Button
          variant="primary"
          onClick={() => dispatch({ type: CHECK_AUTH, payload: { nodeName } })}
          isDisabled={nodeName.length < 1}
          data-role="check-node-authentication"
        >
          Check authentication
        </Button>
      )}
      {authState === AUTH_STATE.CHECKING && (
        <Spinner text="Checking authentication" data-role="waiting-auth" />
      )}

      {authState === AUTH_STATE.ALREADY_AUTHENTICATED && (
        <InlineAlert
          variant="success"
          title="Node is authenticated. You can add the cluster now."
          data-role="auth-success-message"
        />
      )}
      {
        [
          AUTH_STATE.NOT_AUTHENTICATED,
          AUTH_STATE.AUTHENTICATION_IN_PROGRESS,
          AUTH_STATE.AUTHENTICATION_FAILED,
        ].includes(authState)
        &&
        (
          <AddClusterAuthRequired
            nodeName={nodeName}
            authenticationInProgress={
              authState === AUTH_STATE.AUTHENTICATION_IN_PROGRESS
            }
            authenticationError={
              authState === AUTH_STATE.AUTHENTICATION_FAILED
                ? stateError
                : ""
            }
          />
        )
      }
      {authState === AUTH_STATE.ERROR && (
        <InlineAlert
          variant="danger"
          title={stateError}
          data-role="auth-error-message"
        />
      )}
    </Form>
  );
};

export default AddClusterStepAuth;
