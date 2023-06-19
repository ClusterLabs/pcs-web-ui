import {
  TaskFinishLibWizard,
  TaskResultAction,
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
    clusterName,
    areSetsValid,
    isTicketValid,
    isCustomIdValid,
    create,
    state: {
      libCall: {reports, response},
    },
  } = useTask();
  const title = "Create ticket constraint with resource set";
  return (
    <Wizard
      clusterName={clusterName}
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
                preAction: () => create({force: false}),
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
              taskName={title}
              success={
                <TaskSuccess
                  taskName={title}
                  primaryAction={<TaskResultAction />}
                />
              }
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
