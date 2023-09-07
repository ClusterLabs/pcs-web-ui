import {testMarks} from "app/view/dataTest";
import {
  TaskButtonResultCancel,
  TaskButtonResultTryAgain,
  TaskButtonSimpleResultBack,
  TaskFinishError,
} from "app/view/share";

import {useTask} from "./useTask";

const {fail} = testMarks.task.nvsetEdit;

export const Fail = () => {
  const {
    attrDesc,
    attrSet,
    isCreate,
    recoverFromError,
    state: {
      call: {resultMessage},
    },
  } = useTask();
  return (
    <TaskFinishError
      title={`${attrDesc} ${isCreate ? "create" : "update"} failed`}
      message={resultMessage}
      primaryAction={
        <TaskButtonSimpleResultBack
          action={recoverFromError}
          {...fail.back.mark}
        />
      }
      secondaryActions={
        <>
          <TaskButtonResultTryAgain action={attrSet} {...fail.tryAgain.mark} />
          <TaskButtonResultCancel {...fail.cancel.mark} />
        </>
      }
      {...fail.mark}
    />
  );
};
