import React from "react";
import {
  Alert,
  AlertActionLink,
  WizardContextConsumer,
} from "@patternfly/react-core";

import {testMarks} from "app/view/dataTest";
import {EmptyStateSpinner, NodesAuthForm, TaskLibStep} from "app/view/share";

import {useTask} from "./useTask";

const {prepareNode} = testMarks.importExistingCluster;
export const PrepareNode = () => {
  const {
    checkNode,
    state: {nodeCheck, nodeCheckMessage, authProcessId},
  } = useTask();

  React.useEffect(() => {
    if (nodeCheck === "not-started") {
      checkNode();
    }
  });

  return (
    <WizardContextConsumer>
      {({onBack}) => (
        <TaskLibStep title="Prepare node">
          {nodeCheck === "auth-check-started" && (
            <EmptyStateSpinner title="Checking if the node is authenticated" />
          )}
          {nodeCheck === "auth-check-failed" && (
            <Alert
              variant="danger"
              isInline
              title="Check if node is authenticated"
              actionLinks={
                <>
                  <AlertActionLink onClick={onBack}>Go back</AlertActionLink>
                  <AlertActionLink onClick={checkNode}>
                    Try again
                  </AlertActionLink>
                </>
              }
              data-test="prepare-node-auth-failed"
            >
              {nodeCheckMessage}
            </Alert>
          )}

          {authProcessId && (
            <>
              <Alert
                isInline
                variant="warning"
                title={"Node is not authenticated. Please authenticate it."}
                data-test="prepare-node-auth"
              />
              <NodesAuthForm authProcessId={authProcessId} />
            </>
          )}

          {nodeCheck === "success" && (
            <Alert
              variant="success"
              isInline
              title={
                "The cluster node is authenticated"
                + " and it is possible to add the cluster to web ui."
              }
              {...prepareNode.success.mark}
            />
          )}
        </TaskLibStep>
      )}
    </WizardContextConsumer>
  );
};
