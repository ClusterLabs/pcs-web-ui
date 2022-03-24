import { TaskFinishLibWizard, Wizard, WizardFooter } from "app/view/share";

import { Review } from "./Review";
import { useTask } from "./useTask";
import { NameType } from "./NameType";
import { InstanceAttrsForm } from "./InstanceAttrsForm";
import { Settings } from "./Settings";

export const FenceDeviceCreate = () => {
  const {
    close,
    create,
    isNameTypeValid,
    isAgentLoaded,
    areInstanceAttrsValid,
    state: {
      fenceDeviceName,
      libCall: { reports, response },
    },
  } = useTask();
  return (
    <Wizard
      task="fenceDeviceCreate"
      data-test="task-fence-device-create"
      onClose={close}
      title="New fence device"
      description="Create new fence device"
      steps={[
        {
          name: "Name and type",
          component: <NameType />,
          footer: (
            <WizardFooter
              next={{ actionIf: isNameTypeValid }}
              back={{ disabled: true }}
            />
          ),
        },
        {
          name: "Instance attributes",
          component: <InstanceAttrsForm />,
          footer: (
            <WizardFooter
              next={{
                actionIf: areInstanceAttrsValid,
                disabled: !isAgentLoaded,
              }}
            />
          ),
          canJumpTo: isNameTypeValid,
        },
        {
          name: "Settings",
          component: <Settings />,
          canJumpTo: isNameTypeValid && areInstanceAttrsValid,
        },
        {
          name: "Review",
          component: <Review />,
          footer: (
            <WizardFooter
              next={{
                preAction: () => create({ force: false }),
                label: "Create fence device",
              }}
            />
          ),
          canJumpTo: isNameTypeValid && areInstanceAttrsValid,
        },
        {
          name: "Result",
          component: (
            <TaskFinishLibWizard
              response={response}
              taskName={`create fence device "${fenceDeviceName}"`}
              backToUpdateSettingsStepName="Name and type"
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
