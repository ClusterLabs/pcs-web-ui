import {testMarks} from "app/view/dataTest";
import {TaskLibReportList, TaskSimpleLib} from "app/view/share";

import {useTask} from "./useTask";
import {Configure} from "./Configure";
import {Footer} from "./Footer";
import {Success} from "./Success";
import {Unsuccess} from "./Unsuccess";
import {CommunicationError} from "./CommunicationError";

const {aclRoleAddPermission: task} = testMarks.task;

export const Task = () => {
  const {
    close,
    label,
    state: {
      libCall: {response, reports},
    },
  } = useTask();

  return (
    <TaskSimpleLib
      taskLabel={label}
      task={"aclRolePermissionAdd"}
      close={close}
      configure={<Configure />}
      footer={<Footer />}
      response={response}
      success={<Success />}
      unsuccess={<Unsuccess />}
      communicationError={<CommunicationError />}
      reports={<TaskLibReportList reports={reports} {...task.report.mark} />}
      {...task.mark}
    />
  );
};
