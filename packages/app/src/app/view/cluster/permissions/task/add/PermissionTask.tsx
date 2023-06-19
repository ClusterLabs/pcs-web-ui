import {TaskSimple, TaskSimpleFinish, TaskSimpleFooter} from "app/view/share";

import {useTask} from "./useTask";
import {Configure} from "./Configure";

export const PermissionTask = () => {
  const {
    close,
    name: taskName,
    clusterName,
    recoverFromError,
    permissionEdit: permissionCreate,
    isNameValid,
    areCompetenciesValid,
    state: {
      call: {response, resultMessage},
      initialPermission,
    },
  } = useTask();

  const isCreate = initialPermission === null;

  return (
    <TaskSimple
      taskLabel={`${isCreate ? "create" : "update"} permission`}
      task={taskName}
      clusterName={clusterName}
      close={close}
      footer={
        response !== "" ? null : (
          <TaskSimpleFooter
            nextIf={isNameValid && areCompetenciesValid}
            run={permissionCreate}
            runLabel={isCreate ? "Create permission" : "Update permission"}
          />
        )
      }
      data-test="permission-edit"
    >
      {response === "" && <Configure />}
      {response !== "" && (
        <TaskSimpleFinish
          response={response}
          resultMessage={resultMessage}
          waitTitle={`${isCreate ? "Creating" : "Updating"} permission`}
          failTitle={`Permission ${isCreate ? "create" : "update"} failed`}
          tryAgain={permissionCreate}
          recoverFromError={recoverFromError}
        />
      )}
    </TaskSimple>
  );
};
