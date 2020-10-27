import React from "react";

import { Wizard } from "app/view";

import { useWizard } from "./useWizard";
import { NodeAddNodeName, NodeAddNodeNameFooter } from "./step1NodeName";
import {
  NodeAddPrepareNode,
  NodeAddPrepareNodeFooter,
} from "./step2PrepareNode";
import { NodeAddSbd, NodeAddSbdFooter } from "./step3Sbd";
import { NodeAddReview, NodeAddReviewFooter } from "./review";
import { NodeAddFinish } from "./finish";

export const NodeAdd: React.FC = () => {
  const { close } = useWizard();
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
        },
        {
          name: "Configure sbd",
          component: <NodeAddSbd />,
          footer: <NodeAddSbdFooter />,
        },
        {
          name: "Review",
          component: <NodeAddReview />,
          footer: <NodeAddReviewFooter />,
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
