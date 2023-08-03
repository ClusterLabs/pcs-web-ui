import {testMarks} from "app/view/dataTest";
import {
  TaskButtonResultCancel,
  TaskButtonResultProceedAnyway,
  TaskButtonResultnBackCluster,
  TaskFinishLibUnsuccess,
} from "app/view/share";

import {useTask} from "./useTask";

const {unsuccess} = testMarks.task.constraintTicketCreate;

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
      back={<TaskButtonResultnBackCluster {...unsuccess.back.mark} />}
      proceed={
        <TaskButtonResultProceedAnyway
          action={() => createTicket({force: true})}
          {...unsuccess.proceedAnyway.mark}
        />
      }
      cancel={<TaskButtonResultCancel />}
      {...unsuccess.mark}
    />
  );
};
