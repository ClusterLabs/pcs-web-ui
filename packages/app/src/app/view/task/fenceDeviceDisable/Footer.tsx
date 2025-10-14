import {testMarks} from "app/view/dataTest";
import {TaskButtonCancel, TaskButtonNext} from "app/view/share";

import {useTask} from "./useTask";

const {fenceDeviceDisable: task} = testMarks.task;

export const Footer = () => {
  const {label, disableFenceDevice} = useTask();
  return (
    <>
      <TaskButtonNext
        run={() => disableFenceDevice({force: false})}
        {...task.run.mark}
      >
        {label}
      </TaskButtonNext>
      <TaskButtonCancel {...task.cancel.mark} />
    </>
  );
};
