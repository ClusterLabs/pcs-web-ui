import {
  TaskFinishLibCommunicationError,
  TaskFinishLibUnsuccess,
  TaskLibReports,
  TaskResultAction,
  TaskResultActionBackCluster,
  TaskResultActionCancel,
  TaskResultActionProceedAnyway,
  TaskResultActionTryAgain,
  TaskResultLib,
  TaskSimple,
  TaskSimpleFooter,
  TaskSuccess,
} from "app/view/share";

import {useTask} from "./useTask";
import {Configure} from "./Configure";

export const Task = () => {
  const {
    close,
    name: taskName,
    clusterName,
    createTicket,
    state: {
      libCall: {response, reports},
    },
  } = useTask();

  const taskLabel = "Create ticket constraint";
  return (
    <TaskSimple
      taskLabel={taskLabel}
      task={taskName}
      clusterName={clusterName}
      close={close}
      footer={
        response !== "no-response" ? null : (
          <TaskSimpleFooter
            run={() => createTicket({force: false})}
            runLabel={taskLabel}
          />
        )
      }
    >
      {response === "no-response" && <Configure />}
      {response !== "no-response" && (
        <TaskResultLib
          response={response}
          success={<TaskSuccess primaryAction={<TaskResultAction />} />}
          unsuccess={
            <TaskFinishLibUnsuccess
              reports={reports}
              back={<TaskResultActionBackCluster />}
              proceed={
                <TaskResultActionProceedAnyway
                  action={() => createTicket({force: true})}
                />
              }
              cancel={<TaskResultActionCancel />}
            />
          }
          communicationError={
            <TaskFinishLibCommunicationError
              tryAgain={
                <TaskResultActionTryAgain
                  action={() => createTicket({force: false})}
                />
              }
              cancel={<TaskResultActionCancel />}
            />
          }
          reports={<TaskLibReports reports={reports} />}
        />
      )}
    </TaskSimple>
  );
};
