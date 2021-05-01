import React from "react";

import { Wizard, WizardFooter } from "app/view/share";

import { Review } from "./Review";
import { Finish } from "./Finish";
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
    tryNext,
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
              onNext={() => tryNext(isNameTypeValid)}
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
              onNext={() => tryNext(areInstanceAttrsValid)}
              onClose={close}
              nextDisabled={!isAgentLoaded}
            />
          ),
          canJumpTo: isNameTypeValid,
        },
        {
          name: "Settings",
          component: <Settings />,
          footer: (
            <WizardFooter
              onNext={() => tryNext(areSettingsValid)}
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
              preNext={() => create({ force: false })}
              nextLabel="Create resource"
              onClose={close}
            />
          ),
          canJumpTo:
            isNameTypeValid && areInstanceAttrsValid && areSettingsValid,
        },
        {
          name: "Result",
          component: <Finish />,
          isFinishedStep: true,
        },
      ]}
    />
  );
};
