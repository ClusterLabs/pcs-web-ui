import React from "react";
import {
  Form,
  FormGroup,
  TextInput,
  Button,
} from "@patternfly/react-core";
import { useSelector, useDispatch } from "react-redux";

import { Spinner } from "app/components";
import { Success, Error } from "app/components/StatusSign";

import { selectors } from "../plugin";
import { stepAuthStates } from "../constants";
import * as actions from "../actions";
import AddClusterAuthRequired from "./AddClusterAuthRequired";

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
          onChange={currentNodeName => dispatch(
            actions.updateNodeName(currentNodeName),
          )}
        />
      </FormGroup>
      {authState === stepAuthStates.INITIAL && (
        <Button
          variant="primary"
          onClick={() => dispatch(actions.checkAuth(nodeName))}
          isDisabled={nodeName.length < 1}
          data-role="check-node-authentication"
        >
          Check authentication
        </Button>
      )}
      {authState === stepAuthStates.CHECKING && (
        <Spinner text="Checking authentication" data-role="waiting-auth" />
      )}

      {authState === stepAuthStates.ALREADY_AUTHENTICATED && (
        <Success
          label="Node is authenticated. You can add the cluster now."
          data-role="auth-success-message"
        />
      )}
      {
        [
          stepAuthStates.NOT_AUTHENTICATED,
          stepAuthStates.AUTHENTICATION_IN_PROGRESS,
          stepAuthStates.AUTHENTICATION_FAILED,
        ].includes(authState)
        &&
        (
          <AddClusterAuthRequired
            nodeName={nodeName}
            authenticationInProgress={
              authState === stepAuthStates.AUTHENTICATION_IN_PROGRESS
            }
            authenticationError={
              authState === stepAuthStates.AUTHENTICATION_FAILED
                ? stateError
                : ""
            }
          />
        )
      }
      {authState === stepAuthStates.ERROR && (
        <Error data-role="auth-error-message" label={stateError} />
      )}
    </Form>
  );
};

export default AddClusterStepAuth;
