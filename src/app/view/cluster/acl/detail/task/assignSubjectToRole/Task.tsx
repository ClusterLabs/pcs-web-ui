import { TaskFinishLib, TaskSimple, TaskSimpleFooter } from "app/view/share";

import { useTask } from "./useTask";
import { ChooseAsignee } from "./ChooseAsignee";

export const Task = () => {
  const {
    name: taskName,
    close,
    assign,
    recoverFromError,
    isAssigneeValid,
    itemsOffer,
    assigneeType,
    state: {
      libCall: { response, reports },
    },
  } = useTask();

  const title = `Assign ${assigneeType}`;

  return (
    <TaskSimple
      title={title}
      task={taskName}
      close={close}
      footer={
        response !== "no-response" ? null : (
          <TaskSimpleFooter
            nextIf={isAssigneeValid}
            nextDisabled={itemsOffer.length === 0}
            run={assign}
            runLabel={title}
          />
        )
      }
    >
      {response === "no-response" && <ChooseAsignee />}
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
