import {testMarks} from "app/view/dataTest";
import {ReviewItem, ReviewList, TaskLibStep} from "app/view/share";

import {useTask} from "./useTask";

const {review} = testMarks.task.sbdConfigure;

export const Review = () => {
  const {
    state: {
      watchdogDict,
      delayStart,
      startmode,
      watchdogTimeout,
      libCall: {reports},
    },
    getSbdTimeout,
  } = useTask();

  return (
    <TaskLibStep title="Review settings" reports={reports} {...review.mark}>
      <ReviewList
        horizontalTermWidthModifier={{
          default: "20ch",
        }}
      >
        <ReviewItem
          label="Watchdog devices"
          value={
            <ReviewList>
              {Object.entries(watchdogDict).map(([nodeName, watchdog]) => (
                <span key={nodeName} {...review.watchdog.mark}>
                  <ReviewItem
                    label={
                      <span {...review.watchdog.node.mark}>{nodeName}</span>
                    }
                    value={watchdog}
                    useDefault={{whenValue: "", defaultValue: ""}}
                    {...review.watchdog.value.mark}
                  />
                </span>
              ))}
            </ReviewList>
          }
        />
        <ReviewItem
          label="SBD_DELAY_START"
          value={delayStart}
          useDefault={{whenValue: "DEFAULT", defaultValue: "no"}}
          {...review.delayStart.mark}
        />
        <ReviewItem
          label="SBD_STARTMODE"
          value={startmode}
          useDefault={{whenValue: "DEFAULT", defaultValue: "always"}}
          {...review.startmode.mark}
        />
        <ReviewItem
          label="SBD_WATCHDOG_TIMEOUT"
          value={watchdogTimeout}
          useDefault={{whenValue: "", defaultValue: "5"}}
          {...review.watchdogTimeout.mark}
        />
        <ReviewItem
          label="SBD_TIMEOUT_ACTION"
          value={getSbdTimeout()}
          useDefault={{whenValue: undefined, defaultValue: "flush,reboot"}}
          {...review.timeoutAction.mark}
        />
      </ReviewList>
    </TaskLibStep>
  );
};
