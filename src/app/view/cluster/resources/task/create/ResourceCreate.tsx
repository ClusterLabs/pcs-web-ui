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
              next={{
                actionIf: isNameTypeValid,
                task: "resourceCreate",
              }}
              onClose={close}
              backDisabled
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
                task: "resourceCreate",
              }}
              onClose={close}
            />
          ),
          canJumpTo: isNameTypeValid,
        },
        {
          name: "Settings",
          component: <Settings />,
          footer: (
            <WizardFooter
              next={{
                actionIf: areSettingsValid,
                task: "resourceCreate",
              }}
              onClose={close}
            />
          ),
          canJumpTo: isNameTypeValid && areInstanceAttrsValid,
        },
        {
          name: "Review",
          component: <Review />,
          footer: (
            <WizardFooter
              next={{
                preAction: () => create({ force: false }),
                label: "Create resource",
                task: "resourceCreate",
              }}
              onClose={close}
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
