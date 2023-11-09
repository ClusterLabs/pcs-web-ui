import {testMarks} from "app/view/dataTest";
import {TaskLibStep} from "app/view/share";

import {useTask} from "./useTask";

export const Node = () => {
  const {
    state: {
      libCall: {reports},
    },
  } = useTask();
  return (
    <TaskLibStep
      title=""
      reports={reports}
      {...testMarks.task.resourceMove.mark}
    ></TaskLibStep>
  );
};
