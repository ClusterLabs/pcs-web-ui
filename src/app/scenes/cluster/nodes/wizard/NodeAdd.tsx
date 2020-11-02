import React from "react";

import { Wizard } from "app/view";

import { useWizard } from "./useWizard";
import { NodeAddNodeName, NodeAddNodeNameFooter } from "./step1NodeName";
import {
  NodeAddPrepareNode,
  NodeAddPrepareNodeFooter,
} from "./step2PrepareNode";
import { NodeAddAddresses, NodeAddAddressesFooter } from "./step3Addresses";
import { NodeAddSbd, NodeAddSbdFooter } from "./step4Sbd";
import { NodeAddReview, NodeAddReviewFooter } from "./review";
import { NodeAddFinish } from "./finish";

export const NodeAdd: React.FC = () => {
  const { close, isNameValid, isNodeCheckDoneValid } = useWizard();
  return (
    <Wizard
      data-test="wizard-node-add"
      onClose={close}
      title="Add node"
      description="Add node to the cluster wizard"
      steps={[
        {
          name: "Enter node name",
          component: <NodeAddNodeName />,
          footer: <NodeAddNodeNameFooter />,
        },
        {
          name: "Prepare cluster for node",
          component: <NodeAddPrepareNode />,
          footer: <NodeAddPrepareNodeFooter />,
          canJumpTo: isNameValid,
        },
        {
          name: "Specify node addresses",
          component: <NodeAddAddresses />,
          footer: <NodeAddAddressesFooter />,
          canJumpTo: isNameValid && isNodeCheckDoneValid,
        },
        {
          name: "Configure sbd",
          component: <NodeAddSbd />,
          footer: <NodeAddSbdFooter />,
          canJumpTo: isNameValid && isNodeCheckDoneValid,
        },
        {
          name: "Review",
          component: <NodeAddReview />,
          footer: <NodeAddReviewFooter />,
          canJumpTo: isNameValid && isNodeCheckDoneValid,
        },
        {
          name: "Result",
          component: <NodeAddFinish />,
          isFinishedStep: true,
        },
      ]}
    />
  );
};
