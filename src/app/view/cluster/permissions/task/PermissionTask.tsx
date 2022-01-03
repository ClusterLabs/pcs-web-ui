import { TaskSimple, TaskSimpleFinish, TaskSimpleFooter } from "app/view/share";

import { useTask } from "./useTask";
import { Configure } from "./Configure";

export const PermissionTask = () => {
  const {
    close,
    recoverFromError,
    permissionEdit: permissionCreate,
    isNameValid,
    areCompetenciesValid,
    state: {
      call: { response, resultMessage },
      initialPermission,
    },
  } = useTask(); // CREATE MY TASK

  const isCreate = initialPermission === null;

  return (
    <TaskSimple
      title={`${isCreate ? "Create" : "Update"} permission`}
      close={close}
      footer={
        response !== "" ? null : (
          <TaskSimpleFooter
            task="permissionEdit"
            nextIf={isNameValid && areCompetenciesValid}
            run={permissionCreate}
            runLabel={isCreate ? "Create permission" : "Update permission"}
            cancel={close}
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
          successTitle={`Permission ${
            isCreate ? "created" : "updated"
          } sucessfully`}
          failTitle={`Permission ${isCreate ? "create" : "update"} failed`}
          close={close}
          tryAgain={permissionCreate}
          recoverFromError={recoverFromError}
        />
      )}
    </TaskSimple>
  );
};
