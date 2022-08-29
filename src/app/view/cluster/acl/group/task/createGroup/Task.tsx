import { TaskFinishLib, TaskSimple, TaskSimpleFooter } from "app/view/share";

import { useTask } from "./useTask";
import { Configure } from "./Configure";

export const Task = () => {
  const {
    close,
    aclGroupCreate,
    recoverFromError,
    isNameValid,
    state: {
      libCall: { response, reports },
    },
  } = useTask();

  return (
    <TaskSimple
      title="Create group"
      task={"aclGroupCreate"}
      close={close}
      footer={
        response !== "no-response" ? null : (
          <TaskSimpleFooter
            nextIf={isNameValid}
            run={aclGroupCreate}
            runLabel="Create group"
          />
        )
      }
    >
      {response === "no-response" && <Configure />}
      {response !== "no-response" && (
        <TaskFinishLib
          response={response}
          taskName="Create group"
          backToUpdateSettings={recoverFromError}
          proceedForce={aclGroupCreate}
          tryAgain={aclGroupCreate}
          reports={reports}
        />
      )}
    </TaskSimple>
  );
};
