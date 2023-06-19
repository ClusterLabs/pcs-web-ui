import {
  TaskFinishLibWizard,
  TaskResultAction,
  TaskSuccess,
  Wizard,
  WizardFooter,
} from "app/view/share";

import {Options} from "./Options";
import {Review} from "./Review";
import {useTask} from "./useTask";
import {Watchdogs} from "./Watchdogs";

export const SbdConfigureTask = () => {
  const {
    close,
    clusterName,
    sbdConfigure,
    isWatchdogTimeoutValid,
    state: {
      libCall: {reports, response},
    },
  } = useTask();

  return (
    <Wizard
      clusterName={clusterName}
      task="sbdConfigure"
      data-test="task-sbd-configure"
      onClose={close}
      taskLabel="Configure SBD"
      description="Configure SBD in cluster"
      steps={[
        {
          name: "Watchdog devices",
          component: <Watchdogs />,
          footer: <WizardFooter back={{disabled: true}} />,
        },
        {
          name: "SBD options",
          component: <Options />,
          footer: (
            <WizardFooter
              next={{
                actionIf: isWatchdogTimeoutValid,
              }}
            />
          ),
        },
        {
          name: "Review",
          component: <Review />,
          canJumpTo: isWatchdogTimeoutValid,
          footer: (
            <WizardFooter
              next={{
                preAction: () => sbdConfigure({force: false}),
                label: "Configure SBD",
              }}
            />
          ),
        },
        {
          name: "Result",
          component: (
            <TaskFinishLibWizard
              response={response}
              success={<TaskSuccess primaryAction={<TaskResultAction />} />}
              backToUpdateSettingsStepName="Watchdog devices"
              proceedForce={() => sbdConfigure({force: true})}
              reports={reports}
            />
          ),
          isFinishedStep: true,
        },
      ]}
    />
  );
};
