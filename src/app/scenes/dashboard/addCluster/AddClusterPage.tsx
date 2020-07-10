import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Wizard } from "@patternfly/react-core";

import { Action, selectors } from "app/store";

import { AddClusterStepAuth } from "./AddClusterStepAuth";
import { AddClusterStepAdd } from "./AddClusterStepAdd";

export const AddClusterPage = ({ onClose }: { onClose: () => void }) => {
  const stepAuthState = useSelector(selectors.addClusterGetStepAuthState);
  const nodeName = useSelector(selectors.addClusterGetNodeName);
  const dispatch = useDispatch();

  const steps = [
    {
      name: "Node authentication",
      component: <AddClusterStepAuth />,
      enableNext: stepAuthState === "ALREADY_AUTHENTICATED",
    },
    {
      name: "Add cluster",
      component: <AddClusterStepAdd />,
    },
  ];
  return (
    <Wizard
      data-test="wizard-add-cluster"
      isOpen
      onNext={() =>
        dispatch<Action>({
          type: "ADD_CLUSTER.ADD_CLUSTER",
          payload: { nodeName },
        })
      }
      onClose={onClose}
      title="Add existing cluster"
      description="Add existing cluster wizard"
      steps={steps}
    />
  );
};
