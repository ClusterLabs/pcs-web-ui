import {testMarks} from "app/view/dataTest";
import {TaskButtonCancel, TaskButtonNext} from "app/view/share";

import {useTask} from "./useTask";

const {resourcePrimitiveGroupChange: task} = testMarks.task;

export const Footer = () => {
  const {changeGroup, isGroupValid, isAdjacentResourceValid} = useTask();
  return (
    <>
      <TaskButtonNext
        run={changeGroup}
        runIf={isGroupValid && isAdjacentResourceValid}
        {...task.run.mark}
      >
        Change group
      </TaskButtonNext>
      <TaskButtonCancel {...task.cancel.mark} />
    </>
  );
};
