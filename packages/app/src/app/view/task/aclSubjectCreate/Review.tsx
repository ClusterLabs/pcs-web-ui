import {tools} from "app/store";
import {ReviewItem, ReviewList, TaskLibStep} from "app/view/share";

import {useTask} from "./useTask";

export const Review = () => {
  const {
    state: {
      subjectId,
      subjectType,
      roleList,
      libCall: {reports},
    },
  } = useTask();
  return (
    <TaskLibStep title="Review settings" reports={reports}>
      <ReviewList>
        <ReviewItem
          label={`${tools.labelize(subjectType)} name`}
          value={subjectId}
        />
        <ReviewItem
          label="Assigned roles"
          value={
            roleList.length > 0
              ? roleList.map((role, i) => <div key={i}>{role}</div>)
              : "No role assigned"
          }
        />
      </ReviewList>
    </TaskLibStep>
  );
};
