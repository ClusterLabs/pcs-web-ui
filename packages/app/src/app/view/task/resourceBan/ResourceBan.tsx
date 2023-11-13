import {testMarks} from "app/view/dataTest";
import {Wizard} from "app/view/share";

import {useTask} from "./useTask";
import {Node} from "./Node";
import {NodeFooter} from "./NodeFooter";
import {Review} from "./Review";
import {ReviewFooter} from "./ReviewFooter";
import {Result} from "./Result";
import {Advanced} from "./Advanced";
import {AdvancedFooter} from "./AdvancedFooter";

const node = "Select node";
const review = "Review";

export const ResourceBan = () => {
  const {
    close,
    isNodeSettingConsistent,
    isConstraintLifetimeConsistent,
    state: {resourceType},
  } = useTask();
  return (
    <Wizard
      task="resourceBan"
      {...testMarks.task.resourceBan.mark}
      onClose={close}
      taskLabel={`Ban ${resourceType}`}
      description="Ban resource off the node it is currently running on"
      steps={[
        {
          name: node,
          component: <Node />,
          footer: <NodeFooter />,
        },
        {
          name: "Advanced settings",
          component: <Advanced />,
          footer: <AdvancedFooter />,
          canJumpTo: isNodeSettingConsistent,
        },
        {
          name: review,
          component: <Review />,
          footer: <ReviewFooter />,
          canJumpTo: isNodeSettingConsistent && isConstraintLifetimeConsistent,
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
