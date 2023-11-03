import {
  TaskButtonResult,
  TaskFinishLibWizard,
  TaskSuccess,
  Wizard,
  WizardFooter,
} from "app/view/share";

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
    isScoreValid,
    state: {
      libCall: {reports, response},
    },
  } = useTask();
  return (
    <Wizard
      task="constraintColocationSetCreate"
      data-test="task-constraint-colocation-set-create"
      taskLabel="create colocation constraint with resource set"
      description="Create colocation set constraint"
      onClose={close}
      steps={[
        {
          name: "Resource Sets",
          component: <ResourceSetList />,
          footer: (
            <WizardFooter
              next={{actionIf: areSetsValid}}
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
                actionIf: isCustomIdValid && isScoreValid,
              }}
            />
          ),
        },
        {
          name: "Review",
          canJumpTo: areSetsValid && isCustomIdValid && isScoreValid,
          component: <Review />,
          footer: (
            <WizardFooter
              next={{
                preAction: () => create({force: false}),
                label: "Create colocation constraint",
              }}
            />
          ),
        },
        {
          name: "Result",
          component: (
            <TaskFinishLibWizard
              response={response}
              success={<TaskSuccess primaryAction={<TaskButtonResult />} />}
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
