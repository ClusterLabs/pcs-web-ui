import {Alert, AlertActionLink} from "@patternfly/react-core";
import {WizardContextConsumer} from "@patternfly/react-core/deprecated";

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

const {success, auth} = testMarks.task.clusterSetup.prepareNodes;

export const PrepareNodes = () => {
  const {
    useClusterAndNodesCheck,
    checkAuth,
    sendKnownHosts,
    allReports,
    state: {clusterAndNodesCheck, clusterAndNodesCheckMessage, authProcessId},
  } = useTask();
  useClusterAndNodesCheck();
  return (
    <WizardContextConsumer>
      {({onBack}) => (
        <TaskLibStep title="Prepare nodes" reports={allReports}>
          {(clusterAndNodesCheck === "auth-check-started" ||
            clusterAndNodesCheck === "send-known-hosts-started") && (
            <EmptyStateSpinner
              title={
                {
                  "auth-check-started":
                    "Checking if the nodes are authenticated",
                  "send-known-hosts-started":
                    "Sending updated known host to the setup coordinating node",
                }[clusterAndNodesCheck]
              }
            />
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
                customAddresSwitcher={
                  <NodesAuthCustomAddrSwitch {...auth.useCustomAddress.mark} />
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
              {...success.mark}
            />
          )}
        </TaskLibStep>
      )}
    </WizardContextConsumer>
  );
};
