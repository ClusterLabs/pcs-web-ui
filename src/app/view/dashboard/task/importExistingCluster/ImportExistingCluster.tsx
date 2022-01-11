import { NodeAuthButton, Wizard, WizardFooter } from "app/view/share";

import { NodeName } from "./NodeName";
import { PrepareNode } from "./PrepareNode";
import { useTask } from "./useTask";
import { TaskFinish } from "./TaskFinish";

export const ImportExistingCluster = () => {
  const {
    close,
    importCluster,
    isOpened,
    isNodeNameValid,
    isNodeCheckDoneValid,
    state: { authProcessId },
  } = useTask();

  return isOpened ? (
    <Wizard
      data-test="task-cluster-import"
      title="Add existing cluster"
      description="Manage existing cluster from web ui"
      onClose={close}
      steps={[
        {
          name: "Enter node name",
          component: <NodeName />,
          footer: (
            <WizardFooter
              nextIf={isNodeNameValid}
              onClose={close}
              backDisabled
              task="importExistingCluster"
              nextLabel="Check authentication"
            />
          ),
        },
        {
          name: "Check node name",
          component: <PrepareNode />,
          canJumpTo: isNodeNameValid,
          footer: authProcessId ? (
            <WizardFooter
              next={<NodeAuthButton authProcessId={authProcessId} />}
              onClose={close}
              task="clusterSetup"
            />
          ) : (
            <WizardFooter
              nextDisabled={!isNodeCheckDoneValid}
              onClose={close}
              preNext={importCluster}
              nextLabel="Add existing cluster"
              task="importExistingCluster"
            />
          ),
        },
        {
          name: "Result",
          component: <TaskFinish />,
          isFinishedStep: true,
        },
      ]}
    />
  ) : null;
};
