import {testMarks} from "app/view/dataTest";
import {ReviewItem, ReviewList, ReviewYesNo, TaskLibStep} from "app/view/share";

import {useTask} from "./useTask";

const {resourceMove: task} = testMarks.task;

export const Review = () => {
  const {
    state: {
      useNode,
      node,
      constraintHandling,
      constraintLifetime,
      strictMode,
      resourceType,
      isPromotable,
      limitToPromoted,
      libCall: {reports},
    },
  } = useTask();
  return (
    <TaskLibStep
      title="Review resource move"
      reports={reports}
      {...task.review.mark}
    >
      <ReviewList>
        <ReviewItem
          label="Destination node"
          value={node}
          useDefault={{
            when: !useNode,
            defaultValue: "Not specified",
          }}
          {...task.review.node.mark}
        />
        <ReviewItem
          label="Constraint handling"
          value={
            constraintHandling !== "expire"
              ? constraintHandling
              : `expire after ${constraintLifetime}`
          }
          {...task.review.constraintHandling.mark}
        />
        {constraintHandling === "autoclean" && (
          <ReviewYesNo
            label="Strict mode"
            value={strictMode}
            {...task.review.strictMode.mark}
          />
        )}
        {resourceType === "clone" && isPromotable && (
          <ReviewYesNo
            label="Limit to promoted"
            value={limitToPromoted}
            {...task.review.promoted.mark}
          />
        )}
      </ReviewList>
    </TaskLibStep>
  );
};
