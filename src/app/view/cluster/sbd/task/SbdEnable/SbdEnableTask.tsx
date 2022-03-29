import { TaskFinishLibWizard, Wizard, WizardFooter } from "app/view/share";

import { Options } from "./Options";
import { Review } from "./Review";
import { useTask } from "./useTask";
import { Watchdogs } from "./Watchdogs";

export const SbdEnableTask = () => {
  const {
    close,
    sbdEnable,
    state: {
      libCall: { reports, response },
    },
  } = useTask();
  
  return (
    <Wizard
      task="sbdEnable"
      data-test="task-sbd-enable"
      onClose={close}
      title="Enable SBD"
      description="Enable SBD in cluster"
      steps={[
        {
          name: "Watchdog devices",
          component: <Watchdogs />,
          footer: (
            <WizardFooter
              back={{ disabled: true }}
            />
          ),
        },
        {
          name: "SBD options",
          component: <Options />,
        },
        {
          name: "Review",
          component: <Review />,
          footer: (
            <WizardFooter
              next={{
                preAction: () => sbdEnable({ force: false }),
                label: "Enable SBD",
              }}
            />
          ),
        },
        {
          name: "Result",
          component: (
            <TaskFinishLibWizard
              response={response}
              taskName={"enable SBD"}
              backToUpdateSettingsStepName="Specify watchdog devices for nodes"
              proceedForce={() => sbdEnable({ force: true })}
              reports={reports}
            />
          ),
          isFinishedStep: true,
        },
      ]}
    />
  );
};
