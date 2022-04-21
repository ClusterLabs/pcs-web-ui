import { TaskFinishLibWizard, Wizard, WizardFooter } from "app/view/share";

import { Options } from "./Options";
import { Review } from "./Review";
import { useTask } from "./useTask";
import { Watchdogs } from "./Watchdogs";

export const SbdConfigureTask = () => {
  const {
    close,
    sbdConfigure,
    state: {
      libCall: { reports, response },
    },
  } = useTask();

  return (
    <Wizard
      task="sbdConfigure"
      data-test="task-sbd-configure"
      onClose={close}
      title="Configure SBD"
      description="Configure SBD in cluster"
      steps={[
        {
          name: "Watchdog devices",
          component: <Watchdogs />,
          footer: <WizardFooter back={{ disabled: true }} />,
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
                preAction: () => sbdConfigure({ force: false }),
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
              taskName={"configure SBD"}
              backToUpdateSettingsStepName="Specify watchdog devices for nodes"
              proceedForce={() => sbdConfigure({ force: true })}
              reports={reports}
            />
          ),
          isFinishedStep: true,
        },
      ]}
    />
  );
};
