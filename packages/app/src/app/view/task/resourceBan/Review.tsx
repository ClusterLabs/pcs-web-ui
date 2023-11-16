import {testMarks} from "app/view/dataTest";
import {ReviewItem, ReviewList, ReviewYesNo, TaskLibStep} from "app/view/share";

import {useTask} from "./useTask";

export const Review = () => {
  const {
    state: {
      useNode,
      node,
      constraintHandling,
      constraintLifetime,
      resourceType,
      isPromotable,
      limitToPromoted,
      libCall: {reports},
    },
  } = useTask();
  return (
    <TaskLibStep
      title="Review resource ban"
      reports={reports}
      {...testMarks.task.resourceBan.mark}
    >
      <ReviewList>
        <ReviewItem
          label="Banned node"
          value={node}
          useDefault={{
            when: !useNode,
            defaultValue: "Not specified",
          }}
        />
        <ReviewItem
          label="Constraint handling"
          value={
            constraintHandling !== "expire"
              ? constraintHandling
              : `expire after ${constraintLifetime}`
          }
        />
        {resourceType === "clone" && isPromotable && (
          <ReviewYesNo label="Limit to promoted" value={limitToPromoted} />
        )}
      </ReviewList>
    </TaskLibStep>
  );
};
