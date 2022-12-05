import {tools} from "app/store";
import {
  TaskSimple,
  TaskSimpleFinish,
  TaskSimpleFooter,
} from "app/view/share/task";

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
    <TaskSimple
      title={`${isCreate ? "Create" : "Update"} ${attrTypeLabel} attribute`}
      task={taskName}
      clusterName={clusterName}
      close={close}
      footer={
        response !== "" ? null : (
          <TaskSimpleFooter
            nextIf={
              isNameValid && (type === "update" || !isNameUsed) && isValueValid
            }
            run={attrSet}
            runLabel={`${
              isCreate ? "Create" : "Update"
            } ${attrTypeLabel} attribute`}
          />
        )
      }
      data-test="nvpair-edit"
    >
      {response === "" && <Configure />}
      {response !== "" && (
        <TaskSimpleFinish
          response={response}
          resultMessage={resultMessage}
          waitTitle={`${
            isCreate ? "Creating" : "Updating"
          } ${attrTypeLabel} attribute`}
          successTitle={`${labelize(attrTypeLabel)} attribute ${
            isCreate ? "created" : "updated"
          } successfully`}
          failTitle={`${labelize(attrTypeLabel)} attribute ${
            isCreate ? "create" : "update"
          } failed`}
          tryAgain={attrSet}
          recoverFromError={recoverFromError}
        />
      )}
    </TaskSimple>
  );
};
