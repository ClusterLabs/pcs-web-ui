import {testMarks} from "app/view/dataTest";
import {TaskLibReportList, TaskSimpleLib} from "app/view/share";

import {useTask} from "./useTask";
import {Footer} from "./Footer";
import {Success} from "./Success";
import {Unsuccess} from "./Unsuccess";
import {CommunicationError} from "./CommunicationError";

const {sbdDisable: task} = testMarks.task;

export const SbdDisable = () => {
  const {
    close,
    label,
    state: {
      libCall: {response, reports},
    },
  } = useTask();

  return (
    <TaskSimpleLib
      task="sbdDisable"
      taskLabel={label}
      close={close}
      footer={<Footer />}
      configure="Disable SBD in cluster."
      response={response}
      success={<Success />}
      unsuccess={<Unsuccess />}
      communicationError={<CommunicationError />}
      reports={<TaskLibReportList reports={reports} {...task.report.mark} />}
      {...task.mark}
    />
  );
};
