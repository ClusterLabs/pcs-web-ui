import React from "react";

import { Wizard } from "app/view/share";

import {
  ResourceCreateNameType,
  ResourceCreateNameTypeFooter,
} from "./step1NameType";
import {
  ResourceCreateInstanceAttrsFooter,
  ResourceCreateInstanceAttrsForm,
} from "./step2InstanceAttrs";
import {
  ResourceCreateSettings,
  ResourceCreateSettingsFooter,
} from "./step3Settings";
import { ResourceCreateReview, ResourceCreateReviewFooter } from "./review";
import { ResourceCreateFinish } from "./finish";
import { useTask } from "./useTask";

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
          component: <ResourceCreateNameType />,
          footer: <ResourceCreateNameTypeFooter />,
        },
        {
          name: "Instance attributes",
          component: <ResourceCreateInstanceAttrsForm />,
          footer: <ResourceCreateInstanceAttrsFooter />,
          canJumpTo: isNameTypeValid,
        },
        {
          name: "Settings",
          component: <ResourceCreateSettings />,
          footer: <ResourceCreateSettingsFooter />,
          canJumpTo: isNameTypeValid && areInstanceAttrsValid,
        },
        {
          name: "Review",
          component: <ResourceCreateReview />,
          footer: <ResourceCreateReviewFooter />,
          canJumpTo:
            isNameTypeValid && areInstanceAttrsValid && areSettingsValid,
        },
        {
          name: "Result",
          component: <ResourceCreateFinish />,
          isFinishedStep: true,
        },
      ]}
    />
  );
};
