import {testMarks} from "app/view/dataTest";
import {TaskButtonCancel, TaskButtonNext} from "app/view/share";

import {useTask} from "./useTask";

const {fenceDeviceArgumentsEdit: task} = testMarks.task;

export const Footer = () => {
  const {runUpdate} = useTask();
  return (
    <>
      <TaskButtonNext run={runUpdate} {...task.run.mark}>
        Save arguments
      </TaskButtonNext>
      <TaskButtonCancel {...task.cancel.mark} />
    </>
  );
};
