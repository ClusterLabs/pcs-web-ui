import {
  TaskSimple,
  TaskSimpleFinish,
  TaskSimpleFooter,
} from "app/view/share/task";

import { useTask } from "./useTask";
import { Configure } from "./Configure";

export const Task = () => {
  const {
    close,
    name: taskName,
    attrSet,
    recoverFromError,
    isNameValid,
    isValueValid,
    state: {
      call: { response, resultMessage },
      type,
    },
  } = useTask();
  const isCreate = type === "create";
  return (
    <TaskSimple
      title={`${isCreate ? "Create" : "Update"} utilization attribute`}
      task={taskName}
      close={close}
      footer={
        response !== "" ? null : (
          <TaskSimpleFooter
            nextIf={isNameValid && isValueValid}
            run={attrSet}
            runLabel={`${isCreate ? "Create" : "Update"} utilization attribute`}
          />
        )
      }
      data-test="utilization-attribute-edit"
    >
      {response === "" && <Configure />}
      {response !== "" && (
        <TaskSimpleFinish
          response={response}
          resultMessage={resultMessage}
          waitTitle={`${
            isCreate ? "Creating" : "Updating"
          } utilization attribute`}
          successTitle={`Utilization attribute ${
            isCreate ? "created" : "updated"
          } successfully`}
          failTitle={`Utilization attribute ${
            isCreate ? "create" : "update"
          } failed`}
          tryAgain={attrSet}
          recoverFromError={recoverFromError}
        />
      )}
    </TaskSimple>
  );
};
