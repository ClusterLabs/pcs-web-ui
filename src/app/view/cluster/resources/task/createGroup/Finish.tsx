import React from "react";

import { TaskLibReports, TaskSuccess } from "app/view/share";

import { useTask } from "./useTask";

export const Finish: React.FC = () => {
  const {
    close,
    state: { groupId, reports },
  } = useTask();
  return (
    <>
      <TaskSuccess
        title={`Group "${groupId}" created successfully`}
        close={close}
      />
      <TaskLibReports reports={reports} />
    </>
  );
};
