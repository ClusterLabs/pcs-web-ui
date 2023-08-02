import {testMarks} from "app/view/dataTest";
import {
  TaskFinishLibUnsuccess,
  TaskResultActionBackCluster,
  TaskResultActionCancel,
  TaskResultActionProceedAnyway,
} from "app/view/share";

import {useTask} from "./useTask";

const {unsuccess} = testMarks.task.aclAssignSubjectToRole;
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
      back={<TaskResultActionBackCluster {...unsuccess.back.mark} />}
      proceed={
        <TaskResultActionProceedAnyway
          action={assign}
          {...unsuccess.proceedAnyway.mark}
        />
      }
      cancel={<TaskResultActionCancel {...unsuccess.cancel.mark} />}
      {...unsuccess.mark}
    />
  );
};
