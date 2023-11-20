import {testMarks} from "app/view/dataTest";
import {TaskLibReportList, TaskSimpleLib} from "app/view/share";

import {useTask} from "./useTask";
import {ChooseAssignee} from "./ChooseAssignee";
import {Footer} from "./Footer";
import {Success} from "./Success";
import {Unsuccess} from "./Unsuccess";
import {CommunicationError} from "./CommunicationError";

const {aclAssignSubjectToRole: task} = testMarks.task;

export const AclAssignSubjectToRole = () => {
  const {
    name: taskName,
    label,
    close,
    state: {
      libCall: {response, reports},
    },
  } = useTask();

  return (
    <TaskSimpleLib
      task={taskName}
      taskLabel={label}
      close={close}
      footer={<Footer />}
      configure={<ChooseAssignee />}
      response={response}
      success={<Success />}
      unsuccess={<Unsuccess />}
      communicationError={<CommunicationError />}
      reports={<TaskLibReportList reports={reports} {...task.report.mark} />}
      {...task.mark}
    />
  );
};
