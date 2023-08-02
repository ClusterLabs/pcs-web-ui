import {TaskResultAction, TaskSuccess} from "app/view/share";

export const Success = () => {
  return <TaskSuccess primaryAction={<TaskResultAction />} />;
};
