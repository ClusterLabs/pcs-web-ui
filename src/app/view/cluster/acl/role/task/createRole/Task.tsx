import { TaskFinishLib, TaskSimple, TaskSimpleFooter } from "app/view/share";

import { useTask } from "./useTask";
import { Configure } from "./Configure";

export const Task = () => {
  const {
    close,
    aclRoleCreate,
    recoverFromError,
    isNameValid,
    state: {
      libCall: { response, reports },
    },
  } = useTask();

  return (
    <TaskSimple
      title="Create role"
      task={"aclRoleCreate"}
      close={close}
      footer={
        response !== "no-response" ? null : (
          <TaskSimpleFooter
            nextIf={isNameValid}
            run={aclRoleCreate}
            runLabel="Create Role"
          />
        )
      }
    >
      {response === "no-response" && <Configure />}
      {response !== "no-response" && (
        <TaskFinishLib
          response={response}
          taskName="Create role"
          backToUpdateSettings={recoverFromError}
          proceedForce={aclRoleCreate}
          tryAgain={aclRoleCreate}
          reports={reports}
        />
      )}
    </TaskSimple>
  );
};
