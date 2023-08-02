import {
  TaskFinishLibUnsuccess,
  TaskResultActionBackCluster,
  TaskResultActionCancel,
  TaskResultActionProceedAnyway,
} from "app/view/share";

import {useTask} from "./useTask";

export const Unsuccess = () => {
  const {
    assign,
    state: {
      libCall: {reports},
    },
  } = useTask();
  return (
    <TaskFinishLibUnsuccess
      reports={reports}
      back={<TaskResultActionBackCluster />}
      proceed={<TaskResultActionProceedAnyway action={assign} />}
      cancel={<TaskResultActionCancel />}
    />
  );
};
