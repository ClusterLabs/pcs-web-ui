import {TaskLibReports, TaskResultAction, TaskSuccess} from "app/view/share";

import {useTask} from "./useTask";

export const Finish = () => {
  const {
    state: {groupId, reports},
  } = useTask();
  return (
    <>
      <TaskSuccess
        taskName={`create group ${groupId}`}
        primaryAction={<TaskResultAction />}
      />
      <TaskLibReports reports={reports} />
    </>
  );
};
