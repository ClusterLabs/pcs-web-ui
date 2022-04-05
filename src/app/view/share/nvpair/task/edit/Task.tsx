import { tools } from "app/store";
import {
  TaskSimple,
  TaskSimpleFinish,
  TaskSimpleFooter,
} from "app/view/share/task";

import { useTask } from "./useTask";
import { Configure } from "./Configure";

const { capitalize, getNVPairTypeLabel } = tools;

export const Task = () => {
  const {
    close,
    name: taskName,
    attrSet,
    recoverFromError,
    isNameValid,
    isNameUsed,
    isValueValid,
    state: {
      call: { response, resultMessage },
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
          successTitle={`${capitalize(attrTypeLabel)} attribute ${
            isCreate ? "created" : "updated"
          } successfully`}
          failTitle={`${capitalize(attrTypeLabel)} attribute ${
            isCreate ? "create" : "update"
          } failed`}
          tryAgain={attrSet}
          recoverFromError={recoverFromError}
        />
      )}
    </TaskSimple>
  );
};
