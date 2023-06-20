import {
  TaskFinishLibCommunicationError,
  TaskFinishLibUnsuccess,
  TaskLibReportList,
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

export const SbdDisableTask = () => {
  const {
    close,
    clusterName,
    sbdDisable,
    state: {
      libCall: {response, reports},
    },
  } = useTask();

  const taskLabel = "Disable SBD";

  return (
    <TaskSimple
      task="sbdDisable"
      taskLabel={taskLabel}
      clusterName={clusterName}
      data-test="task-sbd-disable"
      close={close}
      footer={
        response !== "no-response" ? null : (
          <TaskSimpleFooter
            run={() => sbdDisable({force: false})}
            runLabel="Disable SBD"
          />
        )
      }
    >
      {response === "no-response" && "Disable SBD in cluster."}
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
                  action={() => sbdDisable({force: true})}
                />
              }
              cancel={<TaskResultActionCancel />}
            />
          }
          communicationError={
            <TaskFinishLibCommunicationError
              tryAgain={
                <TaskResultActionTryAgain
                  action={() => sbdDisable({force: false})}
                />
              }
              cancel={<TaskResultActionCancel />}
            />
          }
          reports={<TaskLibReportList reports={reports} />}
        />
      )}
    </TaskSimple>
  );
};
