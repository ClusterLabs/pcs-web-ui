import {testMarks} from "app/view/dataTest";
import {Wizard} from "app/view/share";

import {NodeName} from "./NodeName";
import {NodeNameFooter} from "./NodeNameFooter";
import {PrepareNode} from "./PrepareNode";
import {PrepareNodeFooter} from "./PrepareNodeFooter";
import {useTask} from "./useTask";
import {TaskFinish} from "./TaskFinish";

export const ImportExistingCluster = () => {
  const {close, isNodeNameValid} = useTask();

  return (
    <Wizard
      task="importExistingCluster"
      clusterName={null}
      {...testMarks.importExistingCluster.mark}
      taskLabel="Add existing cluster"
      description="Manage existing cluster from web ui"
      onClose={close}
      steps={[
        {
          name: "Enter node name",
          component: <NodeName />,
          footer: <NodeNameFooter />,
        },
        {
          name: "Check node name",
          component: <PrepareNode />,
          canJumpTo: isNodeNameValid,
          footer: <PrepareNodeFooter />,
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
