import {TaskLibReports, TaskSuccess, TaskSuccessAction} from "app/view/share";

import {useTask} from "./useTask";

export const Finish = () => {
  const {
    state: {groupId, reports},
  } = useTask();
  return (
    <>
      <TaskSuccess
        taskName={`create group ${groupId}`}
        primaryAction={<TaskSuccessAction />}
      />
      <TaskLibReports reports={reports} />
    </>
  );
};
