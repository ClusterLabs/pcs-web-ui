import { TaskSimple, TaskSimpleFinish, TaskSimpleFooter } from "app/view/share";

import { useTask } from "./useTask";
import { GroupChangeForm } from "./GroupChangeForm";

export const Task = () => {
  const {
    isGroupValid,
    isAdjacentResourceValid,
    close,
    name: taskName,
    changeGroup,
    recoverFromError,
    state: {
      resourceId,
      call: { response, resultMessage },
    },
  } = useTask();

  return (
    <TaskSimple
      title={`Change group of primitive resource "${resourceId}"?`}
      task={taskName}
      close={close}
      footer={
        response !== "" ? null : (
          <TaskSimpleFooter
            nextIf={isGroupValid && isAdjacentResourceValid}
            run={changeGroup}
            runLabel="Change group"
          />
        )
      }
    >
      {response === "" && <GroupChangeForm />}
      {response !== "" && (
        <TaskSimpleFinish
          response={response}
          resultMessage={resultMessage}
          waitTitle={`Changing group of primitive resource "${resourceId}"`}
          successTitle="Group changed successfully"
          failTitle={`Changing group of primitive resource "${resourceId}" failed`}
          tryAgain={changeGroup}
          recoverFromError={recoverFromError}
        />
      )}
    </TaskSimple>
  );
};
