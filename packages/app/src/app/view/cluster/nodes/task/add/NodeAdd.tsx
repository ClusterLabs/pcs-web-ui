import {testMarks} from "app/view/dataTest";
import {Wizard} from "app/view/share";

import {useTask} from "./useTask";
import {NodeName} from "./NodeName";
import {NodeNameFooter} from "./NodeNameFooter";
import {PrepareNode} from "./PrepareNode";
import {PrepareNodeFooter} from "./PrepareNodeFooter";
import {Addresses} from "./Addresses";
import {AddressesFooter} from "./AddressesFooter";
import {Sbd} from "./Sbd";
import {SbdFooter} from "./SbdFooter";
import {Review} from "./Review";
import {ReviewFooter} from "./ReviewFooter";
import {Result} from "./Result";

const enterNodeName = "Enter node name";
const review = "Review";

export const NodeAdd = () => {
  const {
    clusterName,
    close,
    isNameValid,
    isNodeCheckDoneValid,
    state: {nodeName},
  } = useTask();
  return (
    <Wizard
      task="nodeAdd"
      clusterName={clusterName}
      {...testMarks.task.nodeAdd.mark}
      onClose={close}
      taskLabel={`add node ${nodeName}`}
      description="Add node to the cluster"
      steps={[
        {
          name: enterNodeName,
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
          name: review,
          component: <Review />,
          footer: <ReviewFooter />,
          canJumpTo: isNameValid && isNodeCheckDoneValid,
        },
        {
          name: "Result",
          component: <Result backStep={enterNodeName} reviewStep={review} />,
          isFinishedStep: true,
        },
      ]}
    />
  );
};
