import {Alert, AlertActionLink} from "@patternfly/react-core";

import {testMarks} from "app/view/dataTest";
import {
  NodesAuthInputAddress,
  NodesAuthInputPassword,
  NodesAuthInputPort,
  TaskLibStep,
} from "app/view/share";
import {
  EmptyStateSpinner,
  NodesAuthCustomAddrSwitch,
  NodesAuthForm,
} from "app/view/share";

import {useTask} from "./useTask";

const {success, auth} = testMarks.task.nodeAdd.prepareNode;

export const PrepareNode = () => {
  const {
    useNodeCheck,
    checkCanAddNode,
    checkAuth,
    sendKnownHosts,
    state: {
      nodeCheck,
      nodeCheckMessage,
      authProcessId,
      libCall: {reports},
    },
  } = useTask();
  useNodeCheck();
  return (
    <TaskLibStep title="Prepare node" reports={reports}>
      {(nodeCheck === "can-add-started"
        || nodeCheck === "auth-check-started"
        || nodeCheck === "send-known-hosts-started") && (
        <EmptyStateSpinner
          title={
            {
              "can-add-started":
                "Checking if the node can be added to the cluster",
              "auth-check-started": "Checking if the node is authenticated",
              "send-known-hosts-started":
                "Sending updated known host to the cluster",
            }[nodeCheck]
          }
        />
      )}

      {nodeCheck === "can-add-failed" && (
        <Alert
          variant="danger"
          isInline
          title="Check if the node is not a part of another cluster"
          actionLinks={
            <AlertActionLink onClick={checkCanAddNode}>
              Try again
            </AlertActionLink>
          }
        >
          {nodeCheckMessage}
        </Alert>
      )}

      {nodeCheck === "can-add-cannot" && (
        <Alert
          variant="danger"
          isInline
          title={nodeCheckMessage}
          data-test="prepare-cluster-for-node-cannot-add"
        />
      )}

      {nodeCheck === "auth-check-failed" && (
        <Alert
          variant="danger"
          isInline
          title="Check if the node is authenticated"
          actionLinks={
            <AlertActionLink onClick={checkAuth}>Try again</AlertActionLink>
          }
          data-test="prepare-cluster-for-node-auth-failed"
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

      {nodeCheck === "send-known-hosts-fail" && (
        <Alert
          variant="danger"
          isInline
          title="Sending updated known host to the cluster failed"
          actionLinks={
            <AlertActionLink onClick={sendKnownHosts}>
              Try again
            </AlertActionLink>
          }
        >
          {nodeCheckMessage}
        </Alert>
      )}

      {nodeCheck === "success" && (
        <Alert
          variant="success"
          isInline
          title="The node is prepared for adding to the cluster."
          {...success.mark}
        />
      )}
    </TaskLibStep>
  );
};
