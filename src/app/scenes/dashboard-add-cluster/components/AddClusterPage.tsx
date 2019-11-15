import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Wizard } from "@patternfly/react-core";

import { Action } from "app/common/actions";
import * as selectors from "../selectors";
import AddClusterStepAuth from "./AddClusterStepAuth";
import AddClusterStepAdd from "./AddClusterStepAdd";

const AddClusterPage = ({ onClose }: { onClose: () => void }) => {
  const stepAuthState = useSelector(selectors.getStepAuthState);
  const nodeName = useSelector(selectors.getNodeName);
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
      data-role="add-cluster-wizard"
      isOpen
      onNext={() => dispatch<Action>({
        type: "ADD_CLUSTER.ADD_CLUSTER",
        payload: { nodeName },
      })}
      onClose={onClose}
      title="Add existing cluster"
      description="Add existing cluster wizard"
      steps={steps}
    />
  );
};

export default AddClusterPage;
