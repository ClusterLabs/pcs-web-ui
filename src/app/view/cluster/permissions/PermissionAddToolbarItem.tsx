import React from "react";
import { Button } from "@patternfly/react-core";

import { TaskSimple, TaskSimpleFinish} from "app/view/share";

import { useTask } from "../constraints/task/createColocation/useTask";
import { Configure } from "../constraints/task/createLocation/Configure";

export const PermissionAddToolbarItem = () => {
  const {
    open,
    close,
    recoverFromError,
    isOpened,
    state: {
      call: { response, resultMessage },
    },
  } = useTask();  // CREATE MY TASK
  //const dispatch = useDispatch();

  return (
    <>
      <Button
        variant={"primary"}
        onClick={open}
        data-test="permission-add"
      >
        Add Permission
      </Button>
      {isOpened && (
        <TaskSimple
          title="Add permission"
          close={close}
          footer={
            <>
              <Button variant="link" onClick={close}>
                Cancel
              </Button>
              </>
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
              tryAgain={close} // ADD
              recoverFromError={recoverFromError}
            />
          )}
        </TaskSimple>
      )}
    </>
  );
};
