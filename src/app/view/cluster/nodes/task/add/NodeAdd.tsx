import React from "react";

import { ClusterWizardFooter, Wizard } from "app/view/share";

import { useTask } from "./useTask";
import { NodeName } from "./NodeName";
import { PrepareNode } from "./PrepareNode";
import { AuthButton } from "./AuthButton";
import { Addresses } from "./Addresses";
import { Sbd } from "./Sbd";
import { Review } from "./Review";
import { Finish } from "./Finish";

export const NodeAdd: React.FC = () => {
  const {
    state: { authProcessId },
    close,
    isNameValid,
    isNodeCheckDoneValid,
    nodeAdd,
  } = useTask();
  return (
    <Wizard
      data-test="task-node-add"
      onClose={close}
      title="Add node"
      description="Add node to the cluster wizard"
      steps={[
        {
          name: "Enter node name",
          component: <NodeName />,
          footer: (
            <ClusterWizardFooter
              nextIf={isNameValid}
              onClose={close}
              backDisabled
            />
          ),
        },
        {
          name: "Check node",
          component: <PrepareNode />,
          footer: authProcessId ? (
            <ClusterWizardFooter
              next={<AuthButton authProcessId={authProcessId} />}
              onClose={close}
            />
          ) : (
            <ClusterWizardFooter
              nextDisabled={!isNodeCheckDoneValid}
              onClose={close}
            />
          ),
          canJumpTo: isNameValid,
        },
        {
          name: "Specify node addresses",
          component: <Addresses />,
          footer: <ClusterWizardFooter onClose={close} />,
          canJumpTo: isNameValid && isNodeCheckDoneValid,
        },
        {
          name: "Configure sbd",
          component: <Sbd />,
          footer: <ClusterWizardFooter onClose={close} />,
          canJumpTo: isNameValid && isNodeCheckDoneValid,
        },
        {
          name: "Review",
          component: <Review />,
          footer: (
            <ClusterWizardFooter
              preNext={() => nodeAdd()}
              nextLabel="Create resource"
              onClose={close}
            />
          ),
          canJumpTo: isNameValid && isNodeCheckDoneValid,
        },
        {
          name: "Result",
          component: <Finish />,
          isFinishedStep: true,
        },
      ]}
    />
  );
};
