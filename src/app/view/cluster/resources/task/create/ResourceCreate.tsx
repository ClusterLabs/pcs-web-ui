import React from "react";

import { TaskFinishLibWizard, Wizard, WizardFooter } from "app/view/share";

import { Review } from "./Review";
import { useTask } from "./useTask";
import { NameType } from "./NameType";
import { InstanceAttrsForm } from "./InstanceAttrsForm";
import { Settings } from "./Settings";

export const ResourceCreate: React.FC = () => {
  const {
    close,
    create,
    isNameTypeValid,
    isAgentLoaded,
    areInstanceAttrsValid,
    areSettingsValid,
    state: {
      resourceName,
      libCall: { reports, response },
    },
  } = useTask();
  return (
    <Wizard
      data-test="task-resource-create"
      onClose={close}
      title="New resource"
      description="Create new resource"
      steps={[
        {
          name: "Name and type",
          component: <NameType />,
          footer: (
            <WizardFooter
              nextIf={isNameTypeValid}
              onClose={close}
              backDisabled
              task="resourceCreate"
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
              task="resourceCreate"
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
              task="resourceCreate"
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
              nextLabel="Create resource"
              onClose={close}
              task="resourceCreate"
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
              taskName={`create resource "${resourceName}"`}
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
