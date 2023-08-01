import React from "react";
import {
  Alert,
  AlertActionLink,
  WizardContextConsumer,
} from "@patternfly/react-core";

import {testMarks} from "app/view/dataTest";
import {
  EmptyStateSpinner,
  NodesAuthCustomAddrSwitch,
  NodesAuthForm,
  NodesAuthInputAddress,
  NodesAuthInputPassword,
  NodesAuthInputPort,
  TaskLibStep,
} from "app/view/share";

import {useTask} from "./useTask";

const {prepareNode} = testMarks.task.importExistingCluster;
const {auth} = prepareNode;
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
              <NodesAuthForm
                authProcessId={authProcessId}
                customAddresSwitcher={
                  <NodesAuthCustomAddrSwitch {...auth.customAddrSwitch.mark} />
                }
                inputPassword={(nodeName, elementId, index) => (
                  <NodesAuthInputPassword
                    index={index}
                    nodeName={nodeName}
                    elementId={elementId}
                    {...auth.password.mark}
                  />
                )}
                inputAddress={(nodeName, elementId) => (
                  <NodesAuthInputAddress
                    nodeName={nodeName}
                    elementId={elementId}
                    {...auth.address.mark}
                  />
                )}
                inputPort={(nodeName, elementId) => (
                  <NodesAuthInputPort
                    nodeName={nodeName}
                    elementId={elementId}
                    {...auth.port.mark}
                  />
                )}
                {...auth.mark}
              />
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
