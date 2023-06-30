import {
  Alert,
  AlertActionLink,
  WizardContextConsumer,
} from "@patternfly/react-core";

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

export const PrepareNodes = () => {
  const {
    useClusterAndNodesCheck,
    checkCanAddClusterOrNodes,
    checkAuth,
    sendKnownHosts,
    allReports,
    state: {clusterAndNodesCheck, clusterAndNodesCheckMessage, authProcessId},
  } = useTask();
  useClusterAndNodesCheck();
  return (
    <WizardContextConsumer>
      {({onBack}) => {
        return (
          <TaskLibStep title="Prepare nodes" reports={allReports}>
            {(clusterAndNodesCheck === "can-add-started"
              || clusterAndNodesCheck === "auth-check-started"
              || clusterAndNodesCheck === "send-known-hosts-started") && (
              <EmptyStateSpinner
                title={
                  {
                    "can-add-started":
                      "Checking that the cluster can be created from the nodes",
                    "auth-check-started":
                      "Checking if the nodes are authenticated",
                    "send-known-hosts-started":
                      "Sending updated known host to the setup coordinating node",
                  }[clusterAndNodesCheck]
                }
              />
            )}
            {clusterAndNodesCheck === "can-add-cannot" && (
              <Alert
                variant="danger"
                isInline
                title={
                  "Errors appeared during check if cluster name and nodes can be used"
                  + " for the new cluster"
                }
                data-test="prepare-backend-for-cluster-and-nodes-cannot-add"
                actionLinks={
                  <>
                    <AlertActionLink onClick={onBack}>Go back</AlertActionLink>
                    <AlertActionLink onClick={checkCanAddClusterOrNodes}>
                      Try again
                    </AlertActionLink>
                  </>
                }
              >
                You can modify cluster name and/or nodes in the previous step or
                you can try it again if the errors have already become
                irrelevant.
              </Alert>
            )}

            {clusterAndNodesCheck === "can-add-failed" && (
              <Alert
                variant="danger"
                isInline
                title={
                  <>
                    Check that cluster name is not used and no node is a part of
                    another cluster
                  </>
                }
                actionLinks={
                  <AlertActionLink onClick={checkCanAddClusterOrNodes}>
                    Try again
                  </AlertActionLink>
                }
              >
                {clusterAndNodesCheckMessage}
              </Alert>
            )}

            {clusterAndNodesCheck === "auth-check-failed" && (
              <Alert
                variant="danger"
                isInline
                title="Check if nodes are authenticated"
                actionLinks={
                  <>
                    <AlertActionLink onClick={onBack}>Go back</AlertActionLink>
                    <AlertActionLink onClick={checkAuth}>
                      Try again
                    </AlertActionLink>
                  </>
                }
                data-test="prepare-cluster-for-node-auth-failed"
              >
                {clusterAndNodesCheckMessage}
              </Alert>
            )}

            {authProcessId && (
              <>
                <Alert
                  isInline
                  variant="warning"
                  title={"Node(s) not authenticated. Please authenticate it."}
                />
                <NodesAuthForm
                  authProcessId={authProcessId}
                  customAddresSwitcher={<NodesAuthCustomAddrSwitch />}
                  inputPassword={(nodeName, elementId, index) => (
                    <NodesAuthInputPassword
                      index={index}
                      nodeName={nodeName}
                      elementId={elementId}
                    />
                  )}
                  inputAddress={(nodeName, elementId) => (
                    <NodesAuthInputAddress
                      nodeName={nodeName}
                      elementId={elementId}
                    />
                  )}
                  inputPort={(nodeName, elementId) => (
                    <NodesAuthInputPort
                      nodeName={nodeName}
                      elementId={elementId}
                    />
                  )}
                />
              </>
            )}

            {clusterAndNodesCheck === "send-known-hosts-fail" && (
              <Alert
                variant="danger"
                isInline
                title={
                  <>
                    Sending updated known host to the setup coordinating node
                    failed
                  </>
                }
                actionLinks={
                  <AlertActionLink onClick={sendKnownHosts}>
                    Try again
                  </AlertActionLink>
                }
              >
                {clusterAndNodesCheckMessage}
              </Alert>
            )}

            {clusterAndNodesCheck === "success" && (
              <Alert
                variant="success"
                isInline
                title="The nodes are prepared for the cluster setup."
                data-test="prepare-cluster-for-node-success"
              />
            )}
          </TaskLibStep>
        );
      }}
    </WizardContextConsumer>
  );
};
