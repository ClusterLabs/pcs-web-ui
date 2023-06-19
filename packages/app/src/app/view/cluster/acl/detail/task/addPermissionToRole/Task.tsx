import {
  TaskFinishLib,
  TaskResultAction,
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
    recoverFromError,
    invalidPermissionIndexes,
    state: {
      libCall: {response, reports},
    },
  } = useTask();

  const title = "Add permissions to role";

  return (
    <TaskSimple
      title="Add permissions to role"
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
        <TaskFinishLib
          response={response}
          taskName={title}
          success={
            <TaskSuccess
              taskName={title}
              primaryAction={<TaskResultAction />}
            />
          }
          backToUpdateSettings={recoverFromError}
          proceedForce={aclRolePermissionAdd}
          tryAgain={aclRolePermissionAdd}
          reports={reports}
        />
      )}
    </TaskSimple>
  );
};
