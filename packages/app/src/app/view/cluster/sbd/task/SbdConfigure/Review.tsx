import {ReviewItem, ReviewList, TaskLibStep} from "app/view/share";

import {useTask} from "./useTask";

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
    <TaskLibStep title="Review settings" reports={reports}>
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
                <ReviewItem
                  key={nodeName}
                  label={nodeName}
                  value={watchdog}
                  useDefault={{whenValue: "", defaultValue: ""}}
                />
              ))}
            </ReviewList>
          }
        />
        <ReviewItem
          label="SBD_DELAY_START"
          value={delayStart}
          useDefault={{whenValue: "DEFAULT", defaultValue: "no"}}
        />
        <ReviewItem
          label="SBD_STARTMODE"
          value={startmode}
          useDefault={{whenValue: "DEFAULT", defaultValue: "always"}}
        />
        <ReviewItem
          label="SBD_WATCHDOG_TIMEOUT"
          value={watchdogTimeout}
          useDefault={{whenValue: "", defaultValue: "5"}}
        />
        <ReviewItem
          label="SBD_TIMEOUT_ACTION"
          value={getSbdTimeout()}
          useDefault={{whenValue: undefined, defaultValue: "flush,reboot"}}
        />
      </ReviewList>
    </TaskLibStep>
  );
};
