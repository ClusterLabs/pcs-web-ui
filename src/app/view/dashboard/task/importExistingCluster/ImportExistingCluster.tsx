import { NodeAuthWizardFooter, Wizard, WizardFooter } from "app/view/share";

import { NodeName } from "./NodeName";
import { PrepareNode } from "./PrepareNode";
import { useTask } from "./useTask";
import { TaskFinish } from "./TaskFinish";

export const ImportExistingCluster = () => {
  const {
    close,
    importCluster,
    isNodeNameValid,
    isNodeCheckDoneValid,
    state: { authProcessId },
  } = useTask();

  return (
    <Wizard
      task="importExistingCluster"
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
              next={{
                actionIf: isNodeNameValid,
                label: "Check authentication",
              }}
              back={{ disabled: true }}
            />
          ),
        },
        {
          name: "Check node name",
          component: <PrepareNode />,
          canJumpTo: isNodeNameValid,
          footer: authProcessId ? (
            <NodeAuthWizardFooter authProcessId={authProcessId} />
          ) : (
            <WizardFooter
              next={{
                disabled: !isNodeCheckDoneValid,
                preAction: importCluster,
                label: "Add existing cluster",
              }}
            />
          ),
        },
        {
          name: "Result",
          component: (
            <TaskFinish backToUpdateSettingsStepName="Enter node name" />
          ),
          isFinishedStep: true,
        },
      ]}
    />
  );
};
