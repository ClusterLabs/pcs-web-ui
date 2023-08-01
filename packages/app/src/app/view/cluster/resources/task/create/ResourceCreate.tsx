import {testMarks} from "app/view/dataTest";
import {Wizard} from "app/view/share";

import {useTask} from "./useTask";
import {NameType} from "./NameType";
import {NameTypeFooter} from "./NameTypeFooter";
import {InstanceAttrsForm} from "./InstanceAttrsForm";
import {InstanceAttrsFormFooter} from "./InstanceAttrsFormFooter";
import {Settings} from "./Settings";
import {SettingsFooter} from "./SettingsFooter";
import {Review} from "./Review";
import {ReviewFooter} from "./ReviewFooter";
import {Result} from "./Result";

const nameType = "Name and type";
const review = "Review";

export const ResourceCreate = () => {
  const {
    close,
    clusterName,
    isNameTypeValid,
    areInstanceAttrsValid,
    areSettingsValid,
    state: {resourceName},
  } = useTask();
  return (
    <Wizard
      clusterName={clusterName}
      task="resourceCreate"
      {...testMarks.task.createResource.mark}
      onClose={close}
      taskLabel={`create resource "${resourceName}"`}
      description="Create new resource"
      steps={[
        {
          name: nameType,
          component: <NameType />,
          footer: <NameTypeFooter />,
        },
        {
          name: "Instance attributes",
          component: <InstanceAttrsForm />,
          footer: <InstanceAttrsFormFooter />,
          canJumpTo: isNameTypeValid,
        },
        {
          name: "Settings",
          component: <Settings />,
          footer: <SettingsFooter />,
          canJumpTo: isNameTypeValid && areInstanceAttrsValid,
        },
        {
          name: review,
          component: <Review />,
          footer: <ReviewFooter />,
          canJumpTo:
            isNameTypeValid && areInstanceAttrsValid && areSettingsValid,
        },
        {
          name: "Result",
          component: <Result backStep={nameType} reviewStep={review} />,
          isFinishedStep: true,
        },
      ]}
    />
  );
};
