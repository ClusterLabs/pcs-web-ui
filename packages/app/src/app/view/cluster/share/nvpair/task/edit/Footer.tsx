import {testMarks} from "app/view/dataTest";
import {TaskButtonCancel, TaskButtonNext} from "app/view/share";

import {useTask} from "./useTask";

const {nvsetEdit: task} = testMarks.task;

export const Footer = () => {
  const {label, attrSet, isCreate, isNameUsed, isNameValid, isValueValid} =
    useTask();

  return (
    <>
      <TaskButtonNext
        run={attrSet}
        runIf={isNameValid && isValueValid && !(isCreate && isNameUsed)}
        {...task.run.mark}
      >
        {label}
      </TaskButtonNext>
      <TaskButtonCancel {...task.cancel.mark} />
    </>
  );
};
