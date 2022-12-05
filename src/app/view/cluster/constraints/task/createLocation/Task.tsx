import {TaskSimple, TaskSimpleFinish, TaskSimpleFooter} from "app/view/share";

import {useTask} from "./useTask";
import {Configure} from "./Configure";

export const Task = () => {
  const {
    close,
    name: taskName,
    clusterName,
    createLocation,
    recoverFromError,
    isScoreValid,
    isResourceValid,
    isPatternValid,
    isNodeValid,
    isRuleValid,
    state: {
      call: {response, resultMessage},
    },
  } = useTask();
  return (
    <TaskSimple
      title="Create location constraint"
      close={close}
      task={taskName}
      clusterName={clusterName}
      footer={
        response !== "" ? null : (
          <TaskSimpleFooter
            nextIf={
              isScoreValid
              && isResourceValid
              && isPatternValid
              && isNodeValid
              && isRuleValid
            }
            run={createLocation}
            runLabel="Create location constraint"
          />
        )
      }
    >
      {response === "" && <Configure />}
      {response !== "" && (
        <TaskSimpleFinish
          response={response}
          resultMessage={resultMessage}
          waitTitle="Creating location constraint"
          successTitle="Location created successfully"
          failTitle="Create location constraint failed"
          tryAgain={createLocation}
          recoverFromError={recoverFromError}
        />
      )}
    </TaskSimple>
  );
};
