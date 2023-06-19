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
      data-test="task-acl-role-add-permissions"
      clusterName={clusterName}
      close={close}
      footer={
        response !== "no-response" ? null : (
          <TaskSimpleFooter
            run={aclRolePermissionAdd}
            runLabel="Add permissions to role"
            nextIf={invalidPermissionIndexes.length === 0}
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
                <TaskResultActionProceedAnyway action={aclRolePermissionAdd} />
              }
              cancel={<TaskResultActionCancel />}
            />
          }
          communicationError={
            <TaskFinishLibCommunicationError
              tryAgain={
                <TaskResultActionTryAgain action={aclRolePermissionAdd} />
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
