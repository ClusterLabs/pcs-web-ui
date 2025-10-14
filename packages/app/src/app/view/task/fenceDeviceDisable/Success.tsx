import {testMarks} from "app/view/dataTest";
import {TaskButtonResult, TaskSuccess} from "app/view/share";

const {success} = testMarks.task.fenceDeviceDisable;

export const Success = () => {
  return (
    <TaskSuccess
      primaryAction={<TaskButtonResult {...success.close.mark} />}
      {...success.mark}
    />
  );
};
