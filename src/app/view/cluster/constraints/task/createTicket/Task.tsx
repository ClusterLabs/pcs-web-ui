import {TaskFinishLib, TaskSimple, TaskSimpleFooter} from "app/view/share";

import {useTask} from "./useTask";
import {Configure} from "./Configure";

export const Task = () => {
  const {
    close,
    name: taskName,
    createTicket,
    recoverFromError,
    state: {
      libCall: {response, reports},
    },
  } = useTask();
  return (
    <TaskSimple
      title="Create ticket constraint"
      task={taskName}
      close={close}
      footer={
        response !== "no-response" ? null : (
          <TaskSimpleFooter
            run={() => createTicket({force: false})}
            runLabel="Create ticket constraint"
          />
        )
      }
    >
      {response === "no-response" && <Configure />}
      {response !== "no-response" && (
        <TaskFinishLib
          response={response}
          taskName="create ticket constraint"
          backToUpdateSettings={recoverFromError}
          proceedForce={() => createTicket({force: true})}
          tryAgain={() => createTicket({force: false})}
          reports={reports}
        />
      )}
    </TaskSimple>
  );
};
