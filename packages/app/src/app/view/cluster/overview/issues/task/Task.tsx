import {
  NodesAuthCustomAddrSwitch,
  NodesAuthForm,
  NodesAuthInputAddress,
  NodesAuthInputPassword,
  NodesAuthInputPort,
} from "app/view/share";
import {TaskSimple} from "app/view/share";

import {useTask} from "./useTask";
import {ClusterIssueNotAuthFooter} from "./ClusterIssueNotAuthFooter";
import {ClusterIssueNotAuthFinish} from "./ClusterIssueNotAuthFinish";

export const Task = () => {
  const {
    cancel,
    state: {authProcessId},
  } = useTask();
  return (
    <TaskSimple
      taskLabel="Authentication of nodes"
      task="fixAuth"
      close={cancel}
      footer={<ClusterIssueNotAuthFooter />}
    >
      {authProcessId === null && <ClusterIssueNotAuthFinish />}
      {authProcessId !== null && (
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
            <NodesAuthInputAddress nodeName={nodeName} elementId={elementId} />
          )}
          inputPort={(nodeName, elementId) => (
            <NodesAuthInputPort nodeName={nodeName} elementId={elementId} />
          )}
        />
      )}
    </TaskSimple>
  );
};
