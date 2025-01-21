import {testMarks} from "app/view/dataTest";
import {TaskButtonCancel, TaskButtonNext} from "app/view/share";

import {useTask} from "./useTask";

const {constraintLocationCreate: task} = testMarks.task;

export const Footer = () => {
  const {
    label,
    createLocation,
    isScoreValid,
    isResourceValid,
    isPatternValid,
    isNodeValid,
    isRuleValid,
  } = useTask();
  return (
    <>
      <TaskButtonNext
        run={createLocation}
        runIf={
          isScoreValid &&
          isResourceValid &&
          isPatternValid &&
          isNodeValid &&
          isRuleValid
        }
        {...task.run.mark}
      >
        {label}
      </TaskButtonNext>
      <TaskButtonCancel {...task.cancel.mark} />
    </>
  );
};
