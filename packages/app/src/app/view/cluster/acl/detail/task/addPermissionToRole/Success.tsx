import {testMarks} from "app/view/dataTest";
import {TaskButtonResult, TaskSuccess} from "app/view/share";

const {success} = testMarks.task.aclRoleAddPermission;
export const Success = () => {
  return (
    <TaskSuccess
      primaryAction={<TaskButtonResult {...success.close.mark} />}
      {...success.mark}
    />
  );
};
