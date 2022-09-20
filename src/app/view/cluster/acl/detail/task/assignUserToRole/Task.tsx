import { TaskFinishLib, TaskSimple, TaskSimpleFooter } from "app/view/share";

import { useTask } from "./useTask";
import { Configure } from "./Configure";

export const Task = () => {
  const {
    close,
    aclUserAssign,
    recoverFromError,
    isUserIdValid,
    state: {
      libCall: { response, reports },
    },
  } = useTask();

  return (
    <TaskSimple
      title="Assign user to role"
      task={"aclUserAssign"}
      close={close}
      footer={
        response !== "no-response" ? null : (
          <TaskSimpleFooter
            nextIf={isUserIdValid}
            run={aclUserAssign}
            runLabel="Assign user"
          />
        )
      }
    >
      {response === "no-response" && <Configure />}
      {response !== "no-response" && (
        <TaskFinishLib
          response={response}
          taskName="Assign user"
          backToUpdateSettings={recoverFromError}
          proceedForce={aclUserAssign}
          tryAgain={aclUserAssign}
          reports={reports}
        />
      )}
    </TaskSimple>
  );
};
