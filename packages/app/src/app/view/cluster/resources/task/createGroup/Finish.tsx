import {TaskLibReportList, TaskResultAction, TaskSuccess} from "app/view/share";

import {useTask} from "./useTask";

export const Finish = () => {
  const {
    state: {reports},
  } = useTask();
  return (
    <>
      <TaskSuccess primaryAction={<TaskResultAction />} />
      <TaskLibReportList reports={reports} />
    </>
  );
};
