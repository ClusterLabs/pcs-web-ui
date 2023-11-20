import {testMarks} from "app/view/dataTest";
import {TaskButtonCancel, TaskButtonNext} from "app/view/share";

import {useTask} from "./useTask";

const {constraintColocationCreate: task} = testMarks.task;

export const Footer = () => {
  const {
    label,
    createColocation,
    isScoreValid,
    isResourceValid,
    isWithResourceValid,
  } = useTask();
  return (
    <>
      <TaskButtonNext
        run={createColocation}
        runIf={isResourceValid && isWithResourceValid && isScoreValid}
        {...task.run.mark}
      >
        {label}
      </TaskButtonNext>
      <TaskButtonCancel {...task.cancel.mark} />
    </>
  );
};
