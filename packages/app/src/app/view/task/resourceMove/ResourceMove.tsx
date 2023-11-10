import {testMarks} from "app/view/dataTest";
import {Wizard} from "app/view/share";

import {useTask} from "./useTask";
import {Node} from "./Node";
import {NodeFooter} from "./NodeFooter";
import {Review} from "./Review";
import {ReviewFooter} from "./ReviewFooter";
import {Result} from "./Result";

const node = "Select node";
const review = "Review";

export const ResourceMove = () => {
  const {close, isNodeSettingConsistent} = useTask();
  return (
    <Wizard
      task="resourceMove"
      {...testMarks.task.resourceMove.mark}
      onClose={close}
      taskLabel={"Move resource"}
      description="Move resource"
      steps={[
        {
          name: node,
          component: <Node />,
          footer: <NodeFooter />,
        },
        {
          name: review,
          component: <Review />,
          canJumpTo: isNodeSettingConsistent,
          footer: <ReviewFooter />,
        },
        {
          name: "Result",
          component: <Result backStep={node} reviewStep={review} />,
          isFinishedStep: true,
        },
      ]}
    />
  );
};
