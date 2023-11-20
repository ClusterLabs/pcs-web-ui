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

export const FenceDeviceCreate = () => {
  const {
    close,
    isNameTypeValid,
    areInstanceAttrsValid,
    state: {fenceDeviceName},
  } = useTask();

  return (
    <Wizard
      {...testMarks.task.fenceDeviceCreate.mark}
      task="fenceDeviceCreate"
      onClose={close}
      taskLabel={`create fence device "${fenceDeviceName}"`}
      description="Create new fence device"
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
          canJumpTo: isNameTypeValid && areInstanceAttrsValid,
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
