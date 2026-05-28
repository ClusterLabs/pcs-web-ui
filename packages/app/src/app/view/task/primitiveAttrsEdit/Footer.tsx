import {testMarks} from "app/view/dataTest";
import {TaskButtonCancel, TaskButtonNext} from "app/view/share";

import {useTask} from "./useTask";

const {primitiveAttrsEdit: task} = testMarks.task;

export const Footer = () => {
  const {runUpdate} = useTask();
  return (
    <>
      <TaskButtonNext run={runUpdate} {...task.run.mark}>
        Save attributes
      </TaskButtonNext>
      <TaskButtonCancel {...task.cancel.mark} />
    </>
  );
};
