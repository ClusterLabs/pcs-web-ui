import {testMarks} from "app/view/dataTest";
import {TaskLibReportList, TaskSimpleLib} from "app/view/share";

import {useTask} from "./useTask";
import {Footer} from "./Footer";
import {Success} from "./Success";
import {Unsuccess} from "./Unsuccess";
import {CommunicationError} from "./CommunicationError";

const {fenceDeviceDisable: task} = testMarks.task;

export const FenceDeviceDisable = () => {
  const {
    close,
    label,
    state: {
      libCall: {response, reports},
      fenceDeviceName,
    },
  } = useTask();

  return (
    <TaskSimpleLib
      task="fenceDeviceDisable"
      taskLabel={label}
      close={close}
      footer={<Footer />}
      title={`Disable fence device "${fenceDeviceName}"?`}
      configure={
        <>
          Attempt to stop the stonith devices if they are running and disallow
          the cluster to use them.
        </>
      }
      response={response}
      success={<Success />}
      unsuccess={<Unsuccess />}
      communicationError={<CommunicationError />}
      reports={<TaskLibReportList reports={reports} {...task.report.mark} />}
      {...task.mark}
    />
  );
};
