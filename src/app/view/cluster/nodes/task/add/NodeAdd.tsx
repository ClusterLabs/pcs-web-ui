import React from "react";

import { Wizard, WizardFooter } from "app/view/share";

import { useTask } from "./useTask";
import { NodeName } from "./NodeName";
import { PrepareNode } from "./PrepareNode";
import { PrepareNodeFooter } from "./PrepareNodeFooter";
import { Addresses } from "./Addresses";
import { Sbd } from "./Sbd";
import { Review } from "./Review";
import { Finish } from "./Finish";

export const NodeAdd: React.FC = () => {
  const {
    close,
    isNameValid,
    isNodeCheckDoneValid,
    nodeAdd,
    tryNext,
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
            <WizardFooter
              onNext={() => tryNext(isNameValid)}
              onClose={close}
              backDisabled
            />
          ),
        },
        {
          name: "Check node",
          component: <PrepareNode />,
          footer: <PrepareNodeFooter />,
          canJumpTo: isNameValid,
        },
        {
          name: "Specify node addresses",
          component: <Addresses />,
          footer: <WizardFooter onClose={close} />,
          canJumpTo: isNameValid && isNodeCheckDoneValid,
        },
        {
          name: "Configure sbd",
          component: <Sbd />,
          footer: <WizardFooter onClose={close} />,
          canJumpTo: isNameValid && isNodeCheckDoneValid,
        },
        {
          name: "Review",
          component: <Review />,
          footer: (
            <WizardFooter
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
