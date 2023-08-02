import {TaskLibReportList, TaskSimpleLib} from "app/view/share";

import {useTask} from "./useTask";
import {Footer} from "./Footer";
import {Success} from "./Success";
import {Unsuccess} from "./Unsuccess";
import {CommunicationError} from "./CommunicationError";

export const SbdDisableTask = () => {
  const {
    close,
    clusterName,
    label,
    state: {
      libCall: {response, reports},
    },
  } = useTask();

  return (
    <TaskSimpleLib
      task="sbdDisable"
      taskLabel={label}
      clusterName={clusterName}
      data-test="task-sbd-disable"
      close={close}
      footer={<Footer />}
      configure="Disable SBD in cluster."
      response={response}
      success={<Success />}
      unsuccess={<Unsuccess />}
      communicationError={<CommunicationError />}
      reports={<TaskLibReportList reports={reports} />}
    />
  );
};
