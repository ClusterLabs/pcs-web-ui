import {testMarks} from "app/view/dataTest";
import {TaskButtonCancel, TaskButtonNext} from "app/view/share";

import {useTask} from "./useTask";

const {sbdDisable: task} = testMarks.task;

export const Footer = () => {
  const {label, sbdDisable} = useTask();
  return (
    <>
      <TaskButtonNext run={() => sbdDisable({force: false})} {...task.run.mark}>
        {label}
      </TaskButtonNext>
      <TaskButtonCancel {...task.cancel.mark} />
    </>
  );
};
