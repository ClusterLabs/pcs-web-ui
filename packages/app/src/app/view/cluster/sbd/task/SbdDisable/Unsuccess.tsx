import {testMarks} from "app/view/dataTest";
import {
  TaskButtonResultCancel,
  TaskButtonResultProceedAnyway,
  TaskButtonResultnBackCluster,
  TaskFinishLibUnsuccess,
} from "app/view/share";

import {useTask} from "./useTask";

const {unsuccess} = testMarks.task.sbdDisable;

export const Unsuccess = () => {
  const {
    sbdDisable,
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
          action={() => sbdDisable({force: true})}
          {...unsuccess.proceedAnyway.mark}
        />
      }
      cancel={<TaskButtonResultCancel {...unsuccess.cancel.mark} />}
      {...unsuccess.mark}
    />
  );
};
