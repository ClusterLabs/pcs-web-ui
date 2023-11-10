import {testMarks} from "app/view/dataTest";
import {ReviewItem, ReviewList, TaskLibStep} from "app/view/share";

import {useTask} from "./useTask";

export const Review = () => {
  const {
    state: {
      useNode,
      node,
      constraintHandling,
      constraintLifetime,
      strictMode,
      libCall: {reports},
    },
  } = useTask();
  return (
    <TaskLibStep
      title="Review resource move"
      reports={reports}
      {...testMarks.task.resourceMove.mark}
    >
      <ReviewList>
        <ReviewItem
          label="Destination node"
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
        {constraintHandling === "autoclean" && (
          <ReviewItem label="Strict mode" value={strictMode ? "yes" : "no"} />
        )}
      </ReviewList>
    </TaskLibStep>
  );
};
