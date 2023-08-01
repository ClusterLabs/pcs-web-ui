import {testMarks} from "app/view/dataTest";
import {
  TaskButtonCancel,
  TaskButtonNextWithValidation,
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
  TaskSuccess,
} from "app/view/share";

import {useTask} from "./useTask";
import {Configure} from "./Configure";

const {aclRoleAddPermission: task} = testMarks.task;

export const Task = () => {
  const {
    close,
    clusterName,
    aclRolePermissionAdd,
    invalidPermissionIndexes,
    state: {
      libCall: {response, reports},
    },
  } = useTask();

  const taskLabel = "Add permissions to role";

  return (
    <TaskSimple
      taskLabel={taskLabel}
      task={"aclRolePermissionAdd"}
      {...task.mark}
      clusterName={clusterName}
      close={close}
      footer={
        response !== "no-response" ? null : (
          <>
            <TaskButtonNextWithValidation
              run={aclRolePermissionAdd}
              runIf={invalidPermissionIndexes.length === 0}
              {...task.run.mark}
            >
              Add permissions to role
            </TaskButtonNextWithValidation>
            <TaskButtonCancel {...task.cancel.mark} />
          </>
        )
      }
    >
      {response === "no-response" ? (
        <Configure />
      ) : (
        <TaskResultLib
          response={response}
          success={
            <TaskSuccess
              primaryAction={<TaskResultAction {...task.success.close.mark} />}
              {...task.success.mark}
            />
          }
          unsuccess={
            <TaskFinishLibUnsuccess
              reports={reports}
              back={
                <TaskResultActionBackCluster {...task.unsuccess.back.mark} />
              }
              proceed={
                <TaskResultActionProceedAnyway
                  action={aclRolePermissionAdd}
                  {...task.unsuccess.proceedAnyway.mark}
                />
              }
              cancel={
                <TaskResultActionCancel {...task.unsuccess.cancel.mark} />
              }
              {...task.unsuccess.mark}
            />
          }
          communicationError={
            <TaskFinishLibCommunicationError
              tryAgain={
                <TaskResultActionTryAgain
                  action={aclRolePermissionAdd}
                  {...task.communicationError.tryAgain.mark}
                />
              }
              cancel={
                <TaskResultActionCancel
                  {...task.communicationError.cancel.mark}
                />
              }
              {...task.communicationError.mark}
            />
          }
          reports={
            <TaskLibReportList reports={reports} {...task.report.mark} />
          }
        />
      )}
    </TaskSimple>
  );
};
