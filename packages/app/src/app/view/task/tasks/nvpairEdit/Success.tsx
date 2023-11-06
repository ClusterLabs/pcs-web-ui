import {testMarks} from "app/view/dataTest";
import {TaskButtonResult, TaskSuccess} from "app/view/share";

const {nvsetEdit: task} = testMarks.task;

export const Success = () => {
  return (
    <TaskSuccess
      primaryAction={<TaskButtonResult {...task.success.close.mark} />}
      {...task.success.mark}
    />
  );
};
