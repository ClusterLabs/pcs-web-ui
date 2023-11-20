import {testMarks} from "app/view/dataTest";
import {
  TaskButtonResultCancel,
  TaskButtonResultProceedAnyway,
  TaskButtonResultnBackCluster,
  TaskFinishLibUnsuccess,
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
      back={<TaskButtonResultnBackCluster {...unsuccess.back.mark} />}
      proceed={
        <TaskButtonResultProceedAnyway
          action={assign}
          {...unsuccess.proceedAnyway.mark}
        />
      }
      cancel={<TaskButtonResultCancel {...unsuccess.cancel.mark} />}
      {...unsuccess.mark}
    />
  );
};
