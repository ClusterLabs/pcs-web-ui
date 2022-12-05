import {TaskSimple, TaskSimpleFinish, TaskSimpleFooter} from "app/view/share";

import {useTask} from "./useTask";
import {Configure} from "./Configure";

export const Task = () => {
  const {
    close,
    name: taskName,
    clusterName,
    createOrder,
    recoverFromError,
    isFirstResourceValid,
    isThenResourceValid,
    isScoreValid,
    state: {
      call: {response, resultMessage},
    },
  } = useTask();
  return (
    <TaskSimple
      title="Create order constraint"
      task={taskName}
      clusterName={clusterName}
      close={close}
      footer={
        response !== "" ? null : (
          <TaskSimpleFooter
            nextIf={isFirstResourceValid && isThenResourceValid && isScoreValid}
            run={createOrder}
            runLabel="Create order constraint"
          />
        )
      }
    >
      {response === "" && <Configure />}
      {response !== "" && (
        <TaskSimpleFinish
          response={response}
          resultMessage={resultMessage}
          waitTitle="Creating order constraint"
          successTitle="Order created successfully"
          failTitle="Create order constraint failed"
          tryAgain={createOrder}
          recoverFromError={recoverFromError}
        />
      )}
    </TaskSimple>
  );
};
