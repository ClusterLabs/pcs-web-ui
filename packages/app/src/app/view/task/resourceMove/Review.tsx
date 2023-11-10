import {testMarks} from "app/view/dataTest";
import {ReviewItem, ReviewList, TaskLibStep} from "app/view/share";

import {useTask} from "./useTask";

export const Review = () => {
  const {
    state: {
      useNode,
      node,
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
      </ReviewList>
    </TaskLibStep>
  );
};
