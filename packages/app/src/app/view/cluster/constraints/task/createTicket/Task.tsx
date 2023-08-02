import {TaskLibReportList, TaskSimpleLib} from "app/view/share";

import {useTask} from "./useTask";
import {Configure} from "./Configure";
import {Footer} from "./Footer";
import {Success} from "./Success";
import {Unsuccess} from "./Unsuccess";
import {CommunicationError} from "./CommunicationError";

export const Task = () => {
  const {
    close,
    name: taskName,
    label,
    clusterName,
    state: {
      libCall: {response, reports},
    },
  } = useTask();

  return (
    <TaskSimpleLib
      taskLabel={label}
      task={taskName}
      clusterName={clusterName}
      close={close}
      footer={<Footer />}
      configure={<Configure />}
      response={response}
      success={<Success />}
      unsuccess={<Unsuccess />}
      communicationError={<CommunicationError />}
      reports={<TaskLibReportList reports={reports} />}
    />
  );
};
