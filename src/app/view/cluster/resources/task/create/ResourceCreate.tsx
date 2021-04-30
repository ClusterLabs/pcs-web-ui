import React from "react";

import { Wizard } from "app/view/share";

import { Review } from "./Review";
import { ReviewFooter } from "./ReviewFooter";
import { Finish } from "./Finish";
import { useTask } from "./useTask";
import { NameType } from "./NameType";
import { NameTypeFooter } from "./NameTypeFooter";
import { InstanceAttrsForm } from "./InstanceAttrsForm";
import { InstanceAttrsFooter } from "./InstanceAttrsFooter";
import { Settings } from "./Settings";
import { SettingsFooter } from "./SettingsFooter";

export const ResourceCreate: React.FC = () => {
  const {
    close,
    isNameTypeValid,
    areInstanceAttrsValid,
    areSettingsValid,
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
          footer: <NameTypeFooter />,
        },
        {
          name: "Instance attributes",
          component: <InstanceAttrsForm />,
          footer: <InstanceAttrsFooter />,
          canJumpTo: isNameTypeValid,
        },
        {
          name: "Settings",
          component: <Settings />,
          footer: <SettingsFooter />,
          canJumpTo: isNameTypeValid && areInstanceAttrsValid,
        },
        {
          name: "Review",
          component: <Review />,
          footer: <ReviewFooter />,
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
