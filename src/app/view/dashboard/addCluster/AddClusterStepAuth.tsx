import React from "react";
import { useSelector } from "react-redux";
import { Alert, Button, Form } from "@patternfly/react-core";

import { selectors } from "app/store";
import { EmptyStateSpinner, FormText, useDispatch } from "app/view/share";

import { AddClusterStepAuthForm } from "./AddClusterStepAuthForm";

const helperText =
  "Enter the name of a node in a cluster that you would like to manage";

export const AddClusterStepAuth = () => {
  const authState = useSelector(selectors.addClusterGetStepAuthState);
  const authProcessId = useSelector(selectors.addClusterGetAuthProcessId);
  const nodeName = useSelector(selectors.addClusterGetNodeName);
  const stateError = useSelector(selectors.addClusterGetStateError);
  const dispatch = useDispatch();
  return (
    <>
      <Form data-test="form-auth-check">
        <FormText
          id="add-cluster-node-name"
          label="Node name"
          helperText={helperText}
          isRequired
          data-test="node-name"
          value={nodeName}
          onChange={currentNodeName =>
            dispatch({
              type: "CLUSTER.ADD.NODE_NAME.UPDATE",
              payload: { nodeName: currentNodeName },
            })
          }
        />
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
      {authProcessId && (
        <AddClusterStepAuthForm authProcessId={authProcessId} />
      )}
    </>
  );
};
