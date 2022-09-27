import { TaskFinishLib, TaskSimple, TaskSimpleFooter } from "app/view/share";

import { useTask } from "./useTask";
import { ChooseSubject } from "./ChooseSubject";
import { ChooseRole } from "./ChooseRole";

export const Task = () => {
  const {
    name: taskName,
    close,
    assign,
    recoverFromError,
    isAssigneeValid,
    state: {
      sourceObject,
      subjectType,
      libCall: { response, reports },
    },
  } = useTask();

  const title =
    sourceObject === "subject" ? "Assign role" : `Assign ${subjectType}`;

  return (
    <TaskSimple
      title={title}
      task={taskName}
      close={close}
      footer={
        response !== "no-response" ? null : (
          <TaskSimpleFooter
            nextIf={isAssigneeValid}
            run={assign}
            runLabel={title}
          />
        )
      }
    >
      {response === "no-response"
        && (sourceObject === "role" ? <ChooseSubject /> : <ChooseRole />)}
      {response !== "no-response" && (
        <TaskFinishLib
          response={response}
          taskName={title}
          backToUpdateSettings={recoverFromError}
          proceedForce={assign}
          tryAgain={assign}
          reports={reports}
        />
      )}
    </TaskSimple>
  );
};
