import React from "react";

import { TaskFinishLibWizard, Wizard, WizardFooter } from "app/view/share";

import { Review } from "./Review";
import { useTask } from "./useTask";
import { NameType } from "./NameType";
import { InstanceAttrsForm } from "./InstanceAttrsForm";
import { Settings } from "./Settings";

export const FenceDeviceCreate: React.FC = () => {
  const {
    close,
    create,
    isNameTypeValid,
    isAgentLoaded,
    areInstanceAttrsValid,
    areSettingsValid,
    state: {
      fenceDeviceName,
      libCall: { reports, response },
    },
  } = useTask();
  return (
    <Wizard
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
              nextIf={isNameTypeValid}
              onClose={close}
              backDisabled
              task="fenceDeviceCreate"
            />
          ),
        },
        {
          name: "Instance attributes",
          component: <InstanceAttrsForm />,
          footer: (
            <WizardFooter
              nextIf={areInstanceAttrsValid}
              onClose={close}
              nextDisabled={!isAgentLoaded}
              task="fenceDeviceCreate"
            />
          ),
          canJumpTo: isNameTypeValid,
        },
        {
          name: "Settings",
          component: <Settings />,
          footer: (
            <WizardFooter
              nextIf={areSettingsValid}
              onClose={close}
              task="fenceDeviceCreate"
            />
          ),
          canJumpTo: isNameTypeValid && areInstanceAttrsValid,
        },
        {
          name: "Review",
          component: <Review />,
          footer: (
            <WizardFooter
              preNext={() => create({ force: false })}
              nextLabel="Create fence device"
              onClose={close}
              task="fenceDeviceCreate"
            />
          ),
          canJumpTo:
            isNameTypeValid && areInstanceAttrsValid && areSettingsValid,
        },
        {
          name: "Result",
          component: (
            <TaskFinishLibWizard
              response={response}
              taskName={`create fence device "${fenceDeviceName}"`}
              close={close}
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
