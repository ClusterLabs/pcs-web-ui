import { TaskFinishLibWizard, Wizard, WizardFooter } from "app/view/share";

import { useTask } from "./useTask";
import { Options } from "./Options";
import { ResourceSetList } from "./ResourceSetList";
import { Review } from "./Review";

export const Task = () => {
  const {
    close,
    areSetsValid,
    isTicketValid,
    isCustomIdValid,
    create,
    state: {
      libCall: { reports, response },
    },
  } = useTask();
  return (
    <Wizard
      task="constraintTicketSetCreate"
      data-test="task-constraint-ticket-set-create"
      title="New ticket set constraint"
      description="Create ticket set constraint"
      onClose={close}
      steps={[
        {
          name: "Resource Sets",
          component: <ResourceSetList />,
          footer: (
            <WizardFooter
              next={{ actionIf: areSetsValid }}
              back={{ disabled: true }}
            />
          ),
        },
        {
          name: "Options",
          canJumpTo: areSetsValid,
          component: <Options />,
          footer: (
            <WizardFooter
              next={{
                actionIf: isCustomIdValid && isTicketValid,
              }}
            />
          ),
        },
        {
          name: "Review",
          canJumpTo: areSetsValid && isCustomIdValid && isTicketValid,
          component: <Review />,
          footer: (
            <WizardFooter
              next={{
                preAction: () => create({ force: false }),
                label: "Create ticket constraint",
              }}
            />
          ),
        },
        {
          name: "Result",
          component: (
            <TaskFinishLibWizard
              response={response}
              taskName="create ticket constraint with resource set"
              backToUpdateSettingsStepName="Resource Sets"
              proceedForce={() => create({ force: true })}
              reports={reports}
            />
          ),
          isFinishedStep: true,
        },
      ]}
    />
  );
};
