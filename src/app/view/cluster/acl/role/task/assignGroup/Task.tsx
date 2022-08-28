import { TaskFinishLib, TaskSimple, TaskSimpleFooter } from "app/view/share";

import { useTask } from "./useTask";
import { Configure } from "./Configure";

export const Task = () => {
  const {
    close,
    aclGroupAssign,
    recoverFromError,
    isGroupIdValid,
    state: {
      libCall: { response, reports },
    },
  } = useTask();

  return (
    <TaskSimple
      title="Assign group to role"
      task={"aclGroupAssign"}
      close={close}
      footer={
        response !== "no-response" ? null : (
          <TaskSimpleFooter
            nextIf={isGroupIdValid}
            run={aclGroupAssign}
            runLabel="Assign group"
          />
        )
      }
    >
      {response === "no-response" && <Configure />}
      {response !== "no-response" && (
        <TaskFinishLib
          response={response}
          taskName="Assign group"
          backToUpdateSettings={recoverFromError}
          proceedForce={aclGroupAssign}
          tryAgain={aclGroupAssign}
          reports={reports}
        />
      )}
    </TaskSimple>
  );
};
