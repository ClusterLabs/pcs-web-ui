import {
  TaskFinishLib,
  TaskResultAction,
  TaskSimple,
  TaskSimpleFooter,
  TaskSuccess,
} from "app/view/share";

import {useTask} from "./useTask";
import {Configure} from "./Configure";

export const Task = () => {
  const {
    close,
    name: taskName,
    clusterName,
    createTicket,
    recoverFromError,
    state: {
      libCall: {response, reports},
    },
  } = useTask();

  const title = "Create ticket constraint";
  return (
    <TaskSimple
      title="Create ticket constraint"
      task={taskName}
      clusterName={clusterName}
      close={close}
      footer={
        response !== "no-response" ? null : (
          <TaskSimpleFooter
            run={() => createTicket({force: false})}
            runLabel={title}
          />
        )
      }
    >
      {response === "no-response" && <Configure />}
      {response !== "no-response" && (
        <TaskFinishLib
          response={response}
          taskName={title}
          success={
            <TaskSuccess
              taskName={title}
              primaryAction={<TaskResultAction />}
            />
          }
          backToUpdateSettings={recoverFromError}
          proceedForce={() => createTicket({force: true})}
          tryAgain={() => createTicket({force: false})}
          reports={reports}
        />
      )}
    </TaskSimple>
  );
};
