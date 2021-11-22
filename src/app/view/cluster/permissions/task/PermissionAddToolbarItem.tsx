import { Button } from "@patternfly/react-core";

import { TaskSimple, TaskSimpleFinish, TaskSimpleFooter } from "app/view/share";

import { useTask } from "./useTask";
import { Configure } from "./Configure";

export const PermissionAddToolbarItem = () => {
  const {
    open,
    close,
    recoverFromError,
    permissionCreate,
    isOpened,
    isNameValid,
    state: {
      call: { response, resultMessage },
    },
  } = useTask(); // CREATE MY TASK
  //const dispatch = useDispatch();

  return (
    <>
      <Button variant={"primary"} onClick={open} data-test="permission-add">
        Add Permission
      </Button>
      {isOpened && (
        <TaskSimple
          title="Add permission"
          close={close}
          footer={
            response !== "" ? null : (
              <TaskSimpleFooter
                task="permissionCreate"
                nextIf={isNameValid}
                run={permissionCreate}
                runLabel="Create location constraint"
                cancel={close}
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
              close={close}
              tryAgain={close}
              recoverFromError={recoverFromError}
            />
          )}
        </TaskSimple>
      )}
    </>
  );
};
