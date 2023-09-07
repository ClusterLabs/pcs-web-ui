import {TaskButtonResult, TaskLibReportList, TaskSuccess} from "app/view/share";

import {useTask} from "./useTask";

export const Finish = () => {
  const {
    state: {reports},
  } = useTask();
  return (
    <>
      <TaskSuccess primaryAction={<TaskButtonResult />} />
      <TaskLibReportList reports={reports} />
    </>
  );
};
