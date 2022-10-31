import {TaskFinishLibWizard, Wizard, WizardFooter} from "app/view/share";

import {useTask} from "./useTask";
import {Options} from "./Options";
import {ResourceSetList} from "./ResourceSetList";
import {Review} from "./Review";

export const Task = () => {
  const {
    close,
    create,
    areSetsValid,
    isCustomIdValid,
    state: {
      libCall: {reports, response},
    },
  } = useTask();
  return (
    <Wizard
      task="constraintOrderSetCreate"
      data-test="task-constraint-order-set-create"
      title="New order set constraint"
      description="Create order set constraint"
      onClose={close}
      steps={[
        {
          name: "Resource Sets",
          component: <ResourceSetList />,
          footer: (
            <WizardFooter
              next={{
                actionIf: areSetsValid,
              }}
              back={{disabled: true}}
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
                actionIf: isCustomIdValid,
              }}
            />
          ),
        },
        {
          name: "Review",
          canJumpTo: areSetsValid && isCustomIdValid,
          component: <Review />,
          footer: (
            <WizardFooter
              next={{
                preAction: () => create({force: false}),
                label: "Create order constraint",
              }}
            />
          ),
        },
        {
          name: "Result",
          component: (
            <TaskFinishLibWizard
              response={response}
              taskName="create order constraint with resource set"
              backToUpdateSettingsStepName="Resource Sets"
              proceedForce={() => create({force: true})}
              reports={reports}
            />
          ),
          isFinishedStep: true,
        },
      ]}
    />
  );
};
