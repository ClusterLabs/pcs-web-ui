import React from "react";
import { Button } from "@patternfly/react-core";

import { TaskSimple, TaskSimpleFinish, TaskSimpleFooter } from "app/view/share";

import { useTask } from "./useTask";
import { Configure } from "./Configure";

export const ConstraintCreateTicketToolbarItem: React.FC<{
  variant?: React.ComponentProps<typeof Button>["variant"];
}> = ({ variant = "primary" }) => {
  const {
    open,
    close,
    createTicket,
    recoverFromError,
    isOpened,
    state: {
      libCall: { response },
    },
  } = useTask();
  return (
    <>
      <Button
        variant={variant}
        onClick={open}
        data-test="constraint-ticket-create"
      >
        Create Ticket
      </Button>
      {isOpened && (
        <TaskSimple
          title="Create ticket constraint"
          close={close}
          footer={
            response !== "no-response" ? null : (
              <TaskSimpleFooter
                run={() => createTicket({ force: false })}
                runLabel="Create ticket"
                cancel={close}
              />
            )
          }
        >
          {response === "no-response" && <Configure />}
          {response !== "no-response" && (
            <TaskSimpleFinish
              response="fail"
              resultMessage={"TODO"}
              waitTitle="Creating ticket constraint"
              successTitle="Ticket created successfully"
              failTitle="Create ticket constraint failed"
              close={close}
              tryAgain={() => createTicket({ force: false })}
              recoverFromError={recoverFromError}
            />
          )}
        </TaskSimple>
      )}
    </>
  );
};
