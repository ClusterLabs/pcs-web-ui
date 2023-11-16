import {testMarks} from "app/view/dataTest";
import {ReviewItem, ReviewList, ReviewYesNo, TaskLibStep} from "app/view/share";

import {useTask} from "./useTask";

const {resourceBan: task} = testMarks.task;

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
    <TaskLibStep title="Review resource ban" reports={reports} {...task.mark}>
      <ReviewList>
        <ReviewItem
          label="Banned node"
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
