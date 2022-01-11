import { useSelector } from "react-redux";
import { Wizard } from "@patternfly/react-core";

import { selectors } from "app/store";
import { useDispatch } from "app/view/share";

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
      data-test="task-add-cluster"
      isOpen
      onNext={() =>
        dispatch({
          type: "CLUSTER.ADD",
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
