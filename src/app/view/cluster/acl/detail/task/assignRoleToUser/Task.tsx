import { TaskFinishLib, TaskSimple, TaskSimpleFooter } from "app/view/share";

import { useTask } from "./useTask";
import { Configure } from "./Configure";

export const Task = () => {
  const {
    close,
    aclRoleAssign,
    recoverFromError,
    isRoleIdValid,
    state: {
      libCall: { response, reports },
    },
  } = useTask();

  return (
    <TaskSimple
      title="Assign role to user"
      task={"aclUserAssign"}
      close={close}
      footer={
        response !== "no-response" ? null : (
          <TaskSimpleFooter
            nextIf={isRoleIdValid}
            run={aclRoleAssign}
            runLabel="Assign role"
          />
        )
      }
    >
      {response === "no-response" && <Configure />}
      {response !== "no-response" && (
        <TaskFinishLib
          response={response}
          taskName="Assign role"
          backToUpdateSettings={recoverFromError}
          proceedForce={aclRoleAssign}
          tryAgain={aclRoleAssign}
          reports={reports}
        />
      )}
    </TaskSimple>
  );
};
