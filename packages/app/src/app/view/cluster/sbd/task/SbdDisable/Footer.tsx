import {testMarks} from "app/view/dataTest";
import {TaskButtonCancel, TaskButtonNextWithValidation} from "app/view/share";

import {useTask} from "./useTask";

const {sbdDisable: task} = testMarks.task;

export const Footer = () => {
  const {label, sbdDisable} = useTask();
  return (
    <>
      <TaskButtonNextWithValidation
        run={() => sbdDisable({force: false})}
        {...task.run.mark}
      >
        {label}
      </TaskButtonNextWithValidation>
      <TaskButtonCancel {...task.cancel.mark} />
    </>
  );
};
