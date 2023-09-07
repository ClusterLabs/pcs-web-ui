import {testMarks} from "app/view/dataTest";
import {Wizard} from "app/view/share";

import {useTask} from "./useTask";
import {Watchdogs} from "./Watchdogs";
import {WatchdogsFooter} from "./WatchdogsFooter";
import {Options} from "./Options";
import {OptionsFooter} from "./OptionsFooter";
import {Review} from "./Review";
import {ReviewFooter} from "./ReviewFooter";
import {Result} from "./Result";

const review = "Review";
const watchdogDevices = "Watchdog devices";

export const SbdConfigureTask = () => {
  const {close, clusterName, isWatchdogTimeoutValid} = useTask();

  return (
    <Wizard
      clusterName={clusterName}
      task="sbdConfigure"
      {...testMarks.task.sbdConfigure.mark}
      onClose={close}
      taskLabel="Configure SBD"
      description="Configure SBD in cluster"
      steps={[
        {
          name: watchdogDevices,
          component: <Watchdogs />,
          footer: <WatchdogsFooter />,
        },
        {
          name: "SBD options",
          component: <Options />,
          footer: <OptionsFooter />,
        },
        {
          name: "Review",
          component: <Review />,
          canJumpTo: isWatchdogTimeoutValid,
          footer: <ReviewFooter />,
        },
        {
          name: "Result",
          component: <Result backStep={watchdogDevices} reviewStep={review} />,
          isFinishedStep: true,
        },
      ]}
    />
  );
};
