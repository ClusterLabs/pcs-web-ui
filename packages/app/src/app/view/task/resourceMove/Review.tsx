import {testMarks} from "app/view/dataTest";
import {TaskLibStep} from "app/view/share";

import {useTask} from "./useTask";

export const Review = () => {
  const {
    state: {
      libCall: {reports},
    },
  } = useTask();
  return (
    <TaskLibStep
      title="Review resource move"
      reports={reports}
      {...testMarks.task.resourceMove.mark}
    ></TaskLibStep>
  );
};
