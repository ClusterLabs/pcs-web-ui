import {testMarks} from "app/view/dataTest";
import {ReviewItem, ReviewList, ReviewYesNo, TaskLibStep} from "app/view/share";

import {useTask} from "./useTask";

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
      {...testMarks.task.resourceClear.mark}
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
        {resourceType === "clone" && isPromotable && (
          <ReviewYesNo label="Limit to promoted" value={limitToPromoted} />
        )}
        <ReviewYesNo label="Expired constraints only" value={expiredOnly} />
      </ReviewList>
    </TaskLibStep>
  );
};
