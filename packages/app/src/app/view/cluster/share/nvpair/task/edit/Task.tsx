import {tools} from "app/store";
import {
  TaskButtonResult,
  TaskButtonResultCancel,
  TaskButtonResultTryAgain,
  TaskButtonSimpleResultBack,
  TaskFinishError,
  TaskSimpleFooter,
  TaskSimpleOldApi,
  TaskSuccess,
} from "app/view/share";

import {useTask} from "./useTask";
import {Configure} from "./Configure";

const {labelize, getNVPairTypeLabel} = tools;

export const Task = () => {
  const {
    close,
    name: taskName,
    clusterName,
    attrSet,
    recoverFromError,
    isNameValid,
    isNameUsed,
    isValueValid,
    state: {
      call: {response, resultMessage},
      type,
      owner,
    },
  } = useTask();
  const isCreate = type === "create";
  const attrTypeLabel = getNVPairTypeLabel(owner);
  return (
    <TaskSimpleOldApi
      taskLabel={`${isCreate ? "create" : "update"} ${labelize(
        attrTypeLabel,
      )} attribute`}
      task={taskName}
      clusterName={clusterName}
      close={close}
      waitTitle={`${
        isCreate ? "Creating" : "Updating"
      } ${attrTypeLabel} attribute`}
      footer={
        <TaskSimpleFooter
          nextIf={
            isNameValid && (type === "update" || !isNameUsed) && isValueValid
          }
          run={attrSet}
          runLabel={`${
            isCreate ? "Create" : "Update"
          } ${attrTypeLabel} attribute`}
        />
      }
      response={response}
      configure={<Configure />}
      success={<TaskSuccess primaryAction={<TaskButtonResult />} />}
      fail={
        <TaskFinishError
          title={`${labelize(attrTypeLabel)} attribute ${
            isCreate ? "create" : "update"
          } failed`}
          message={resultMessage}
          primaryAction={
            <TaskButtonSimpleResultBack action={recoverFromError} />
          }
          secondaryActions={
            <>
              <TaskButtonResultTryAgain action={attrSet} />
              <TaskButtonResultCancel />
            </>
          }
        />
      }
      data-test="nvpair-edit"
    />
  );
};
