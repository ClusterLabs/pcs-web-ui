import {testMarks} from "app/view/dataTest";
import {
  TaskFinishLibUnsuccess,
  TaskResultActionBackCluster,
  TaskResultActionCancel,
  TaskResultActionProceedAnyway,
} from "app/view/share";

import {useTask} from "./useTask";

const {unsuccess} = testMarks.task.sbdDisable;

export const Unsuccess = () => {
  const {
    createTicket,
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
          action={() => createTicket({force: true})}
          {...unsuccess.proceedAnyway.mark}
        />
      }
      cancel={<TaskResultActionCancel />}
      {...unsuccess.mark}
    />
  );
};
