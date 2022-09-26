import { TaskFinishLib, TaskSimple, TaskSimpleFooter } from "app/view/share";
import { tools } from "app/store";

import { useTask } from "./useTask";
import { Configure } from "./Configure";

export const Task = () => {
  const {
    name: taskName,
    close,
    createSubject,
    recoverFromError,
    isNameValid,
    state: {
      libCall: { response, reports },
      subjectType,
    },
  } = useTask();

  return (
    <TaskSimple
      title={`Create ${subjectType}`}
      task={taskName}
      close={close}
      footer={
        response !== "no-response" ? null : (
          <TaskSimpleFooter
            nextIf={isNameValid}
            run={createSubject}
            runLabel={`Create ${tools.labelize(subjectType)}`}
          />
        )
      }
    >
      {response === "no-response" && <Configure />}
      {response !== "no-response" && (
        <TaskFinishLib
          response={response}
          taskName={`Create ${subjectType}`}
          backToUpdateSettings={recoverFromError}
          proceedForce={createSubject}
          tryAgain={createSubject}
          reports={reports}
        />
      )}
    </TaskSimple>
  );
};
