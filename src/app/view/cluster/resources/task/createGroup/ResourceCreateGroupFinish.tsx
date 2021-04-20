import React from "react";

import { TaskLibReports, TaskSuccess } from "app/view/share";

import { useTask } from "./useTask";

export const ResourceCreateGroupFinish: React.FC = () => {
  const {
    state: { groupId, reports },
  } = useTask();
  return (
    <>
      <TaskSuccess title={`Group "${groupId}" created successfully`} />
      <TaskLibReports reports={reports} />
    </>
  );
};
