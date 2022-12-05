import {TaskFinishLib, TaskSimple, TaskSimpleFooter} from "app/view/share";

import {useTask} from "./useTask";

export const SbdDisableTask = () => {
  const {
    close,
    clusterName,
    sbdDisable,
    recoverFromError,
    state: {
      libCall: {response, reports},
    },
  } = useTask();

  return (
    <TaskSimple
      title="Disable SBD"
      task="sbdDisable"
      clusterName={clusterName}
      data-test="task-sbd-disable"
      close={close}
      footer={
        response !== "no-response" ? null : (
          <TaskSimpleFooter
            run={() => sbdDisable({force: false})}
            runLabel="Disable SBD"
          />
        )
      }
    >
      {response === "no-response" && "Disable SBD in cluster."}
      {response !== "no-response" && (
        <TaskFinishLib
          response={response}
          taskName="Disable SBD"
          backToUpdateSettings={recoverFromError}
          proceedForce={() => sbdDisable({force: true})}
          tryAgain={() => sbdDisable({force: false})}
          reports={reports}
        />
      )}
    </TaskSimple>
  );
};
