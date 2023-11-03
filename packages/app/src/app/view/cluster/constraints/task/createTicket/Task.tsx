import {testMarks} from "app/view/dataTest";
import {TaskLibReportList, TaskSimpleLib} from "app/view/share";

import {useTask} from "./useTask";
import {Configure} from "./Configure";
import {Footer} from "./Footer";
import {Success} from "./Success";
import {Unsuccess} from "./Unsuccess";
import {CommunicationError} from "./CommunicationError";

const {constraintTicketCreate} = testMarks.task;

export const Task = () => {
  const {
    close,
    name: taskName,
    label,
    state: {
      libCall: {response, reports},
    },
  } = useTask();

  return (
    <TaskSimpleLib
      taskLabel={label}
      task={taskName}
      close={close}
      footer={<Footer />}
      configure={<Configure />}
      response={response}
      success={<Success />}
      unsuccess={<Unsuccess />}
      communicationError={<CommunicationError />}
      reports={<TaskLibReportList reports={reports} />}
      {...constraintTicketCreate.mark}
    />
  );
};
