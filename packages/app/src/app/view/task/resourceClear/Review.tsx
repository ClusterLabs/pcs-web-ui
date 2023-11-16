import {testMarks} from "app/view/dataTest";
import {ReviewItem, ReviewList, ReviewYesNo, TaskLibStep} from "app/view/share";

import {useTask} from "./useTask";

const {resourceClear: task} = testMarks.task;

export const Review = () => {
  const {
    state: {
      useNode,
      node,
      resourceType,
      isPromotable,
      limitToPromoted,
      expiredOnly,
      libCall: {reports},
    },
  } = useTask();
  return (
    <TaskLibStep
      title="Review resource clear"
      reports={reports}
      {...task.review.mark}
    >
      <ReviewList>
        <ReviewItem
          label="Node"
          value={node}
          useDefault={{
            when: !useNode,
            defaultValue: "Not specified",
          }}
          {...task.review.node.mark}
        />
        {resourceType === "clone" && isPromotable && (
          <ReviewYesNo
            label="Limit to promoted"
            value={limitToPromoted}
            {...task.review.promoted.mark}
          />
        )}
        <ReviewYesNo
          label="Expired constraints only"
          value={expiredOnly}
          {...task.review.expiredOnly.mark}
        />
      </ReviewList>
    </TaskLibStep>
  );
};
