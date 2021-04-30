import React from "react";

import { Wizard } from "app/view/share";

import { useTask } from "./useTask";
import { NodeName } from "./NodeName";
import { NodeNameFooter } from "./NodeNameFooter";
import { PrepareNode } from "./PrepareNode";
import { PrepareNodeFooter } from "./PrepareNodeFooter";
import { Addresses } from "./Addresses";
import { AddressesFooter } from "./AddressesFooter";
import { Sbd } from "./Sbd";
import { SbdFooter } from "./SbdFooter";
import { Review } from "./Review";
import { ReviewFooter } from "./ReviewFooter";
import { Finish } from "./Finish";

export const NodeAdd: React.FC = () => {
  const { close, isNameValid, isNodeCheckDoneValid } = useTask();
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
          footer: <NodeNameFooter />,
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
          footer: <AddressesFooter />,
          canJumpTo: isNameValid && isNodeCheckDoneValid,
        },
        {
          name: "Configure sbd",
          component: <Sbd />,
          footer: <SbdFooter />,
          canJumpTo: isNameValid && isNodeCheckDoneValid,
        },
        {
          name: "Review",
          component: <Review />,
          footer: <ReviewFooter />,
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
