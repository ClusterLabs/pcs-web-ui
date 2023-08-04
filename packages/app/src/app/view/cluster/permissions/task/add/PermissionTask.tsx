import {
  TaskButtonResult,
  TaskButtonResultCancel,
  TaskButtonResultTryAgain,
  TaskButtonSimpleResultBack,
  TaskFinishError,
  TaskSimpleFooter,
  TaskSimpleOldApi,
  TaskSuccess,
} from "app/view/share";

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
    <TaskSimpleOldApi
      taskLabel={`${isCreate ? "create" : "update"} permission`}
      task={taskName}
      clusterName={clusterName}
      close={close}
      configure={<Configure />}
      footer={
        <TaskSimpleFooter
          nextIf={isNameValid && areCompetenciesValid}
          run={permissionCreate}
          runLabel={isCreate ? "Create permission" : "Update permission"}
        />
      }
      response={response}
      waitTitle={`${isCreate ? "Creating" : "Updating"} permission`}
      success={<TaskSuccess primaryAction={<TaskButtonResult />} />}
      fail={
        <TaskFinishError
          title={`Permission ${isCreate ? "create" : "update"} failed`}
          message={resultMessage}
          primaryAction={
            <TaskButtonSimpleResultBack action={recoverFromError} />
          }
          secondaryActions={
            <>
              <TaskButtonResultTryAgain action={permissionCreate} />
              <TaskButtonResultCancel />
            </>
          }
        />
      }
      data-test="permission-edit"
    />
  );
};
