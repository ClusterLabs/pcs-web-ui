import { TaskFinishLib, TaskSimple, TaskSimpleFooter } from "app/view/share";

import { useTask } from "./useTask";
import { Configure } from "./Configure";

export const Task = () => {
  const {
    close,
    aclUserCreate,
    recoverFromError,
    isNameValid,
    state: {
      libCall: { response, reports },
    },
  } = useTask();

  return (
    <TaskSimple
      title="Create user"
      task={"aclUserCreate"}
      close={close}
      footer={
        response !== "no-response" ? null : (
          <TaskSimpleFooter
            nextIf={isNameValid}
            run={aclUserCreate}
            runLabel="Create User"
          />
        )
      }
    >
      {response === "no-response" && <Configure />}
      {response !== "no-response" && (
        <TaskFinishLib
          response={response}
          taskName="Create user"
          backToUpdateSettings={recoverFromError}
          proceedForce={aclUserCreate}
          tryAgain={aclUserCreate}
          reports={reports}
        />
      )}
    </TaskSimple>
  );
};
