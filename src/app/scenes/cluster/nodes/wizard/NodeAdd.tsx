import React from "react";
import { Wizard } from "@patternfly/react-core";

import { useWizard } from "./useWizard";
import { NodeAddNodeName } from "./step1NodeName/NodeAddNodeName";

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
      ]}
    />
  );
};
