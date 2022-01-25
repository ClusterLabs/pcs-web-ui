import React from "react";
import { Button } from "@patternfly/react-core";

import { TaskFinishLib, TaskSimple, TaskSimpleFooter } from "app/view/share";

import { useTask } from "./useTask";
import { Configure } from "./Configure";

export const ConstraintCreateTicketToolbarItem: React.FC<{
  variant?: React.ComponentProps<typeof Button>["variant"];
}> = ({ variant = "primary" }) => {
  const {
    open,
    close,
    name: taskName,
    createTicket,
    recoverFromError,
    isOpened,
    state: {
      libCall: { response, reports },
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
          task={taskName}
          close={close}
          footer={
            response !== "no-response" ? null : (
              <TaskSimpleFooter
                run={() => createTicket({ force: false })}
                runLabel="Create ticket constraint"
              />
            )
          }
        >
          {response === "no-response" && <Configure />}
          {response !== "no-response" && (
            <TaskFinishLib
              response={response}
              taskName="create ticket constraint"
              close={close}
              backToUpdateSettings={recoverFromError}
              proceedForce={() => createTicket({ force: true })}
              tryAgain={() => createTicket({ force: false })}
              reports={reports}
            />
          )}
        </TaskSimple>
      )}
    </>
  );
};
