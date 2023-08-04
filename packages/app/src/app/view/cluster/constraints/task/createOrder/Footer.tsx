import {testMarks} from "app/view/dataTest";
import {TaskButtonCancel, TaskButtonNext} from "app/view/share";

import {useTask} from "./useTask";

const {constraintOrderCreate: task} = testMarks.task;

export const Footer = () => {
  const {
    label,
    createOrder,
    isFirstResourceValid,
    isThenResourceValid,
    isScoreValid,
  } = useTask();
  return (
    <>
      <TaskButtonNext
        run={createOrder}
        runIf={isFirstResourceValid && isThenResourceValid && isScoreValid}
        {...task.run.mark}
      >
        {label}
      </TaskButtonNext>
      <TaskButtonCancel {...task.cancel.mark} />
    </>
  );
};
