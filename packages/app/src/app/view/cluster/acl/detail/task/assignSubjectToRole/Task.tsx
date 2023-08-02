import {TaskLibReportList, TaskSimpleLib} from "app/view/share";

import {useTask} from "./useTask";
import {ChooseAssignee} from "./ChooseAssignee";
import {Footer} from "./Footer";
import {Success} from "./Success";
import {Unsuccess} from "./Unsuccess";
import {CommunicationError} from "./CommunicationError";

export const Task = () => {
  const {
    name: taskName,
    label,
    clusterName,
    close,
    assigneeType,
    state: {
      libCall: {response, reports},
    },
  } = useTask();

  return (
    <TaskSimpleLib
      task={taskName}
      taskLabel={label}
      data-test={`task-acl-role-assign-${assigneeType}`}
      clusterName={clusterName}
      close={close}
      footer={<Footer />}
      configure={<ChooseAssignee />}
      response={response}
      success={<Success />}
      unsuccess={<Unsuccess />}
      communicationError={<CommunicationError />}
      reports={<TaskLibReportList reports={reports} />}
    />
  );
};
