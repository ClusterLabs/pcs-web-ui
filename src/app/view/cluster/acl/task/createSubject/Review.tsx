import { tools } from "app/store";
import { ReviewList, ReviewValue, TaskLibStep } from "app/view/share";

import { useTask } from "./useTask";

export const Review = () => {
  const {
    state: {
      subjectId,
      subjectType,
      libCall: { reports },
    },
  } = useTask();
  return (
    <TaskLibStep title="Review settings" reports={reports}>
      <ReviewList>
        <ReviewValue
          label={`${tools.labelize(subjectType)} name`}
          value={subjectId}
        />
      </ReviewList>
    </TaskLibStep>
  );
};
