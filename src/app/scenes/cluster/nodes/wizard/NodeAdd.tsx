import React from "react";
import {
  Wizard,
  WizardContextConsumer,
  WizardFooter,
} from "@patternfly/react-core";

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
      isOpen
      onClose={close}
      title="Add node"
      description="Add node to cluster wizard"
      steps={[
        {
          name: "Enter node name",
          component: <NodeAddNodeName />,
        },
        {
          name: "Prepare node",
          component: <NodeAddPrepareNode />,
        },
        {
          name: "Configure sbd",
          component: <NodeAddSbd />,
        },
        {
          name: "Review",
          component: <NodeAddReview />,
        },
        {
          name: "Result",
          component: <NodeAddFinish />,
          isFinishedStep: true,
        },
      ]}
      footer={
        <WizardFooter>
          <WizardContextConsumer>
            {({ activeStep }) => (
              <>
                {activeStep.name === "Enter node name" && (
                  <NodeAddNodeNameFooter />
                )}
                {activeStep.name === "Prepare node" && (
                  <NodeAddPrepareNodeFooter />
                )}
                {activeStep.name === "Configure sbd" && <NodeAddSbdFooter />}
                {activeStep.name === "Review" && <NodeAddReviewFooter />}
              </>
            )}
          </WizardContextConsumer>
        </WizardFooter>
      }
    />
  );
};
