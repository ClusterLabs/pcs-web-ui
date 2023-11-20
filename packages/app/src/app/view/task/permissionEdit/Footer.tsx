import {testMarks} from "app/view/dataTest";
import {TaskButtonCancel, TaskButtonNext} from "app/view/share";

import {useTask} from "./useTask";

const {permissionEdit: task} = testMarks.task;

export const Footer = () => {
  const {label, permissionEdit, isNameValid, areCompetenciesValid} = useTask();
  return (
    <>
      <TaskButtonNext
        run={permissionEdit}
        runIf={isNameValid && areCompetenciesValid}
        {...task.run.mark}
      >
        {label}
      </TaskButtonNext>
      <TaskButtonCancel {...task.cancel.mark} />
    </>
  );
};
