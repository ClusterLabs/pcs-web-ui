import { ReviewList, ReviewValue, TaskLibStep } from "app/view/share";

import { useTask } from "./useTask";

export const Review: React.FC = () => {
  const {
    state: {
      watchdogDict,
      delayStart,
      startmode,
      watchdogTimeout,
      libCall: { reports },
    },
    getSbdTimeout,
  } = useTask();

  return (
    <TaskLibStep title="Review settings" reports={reports}>
      <ReviewList>
        <ReviewValue
          label="sbd watchdogs"
          value={
            <ReviewList>
              {Object.entries(watchdogDict).map(([nodeName, watchdog]) => (
                <ReviewValue key={nodeName} label={nodeName} value={watchdog} />
              ))}
            </ReviewList>
          }
        />
        <ReviewValue
          label="SBD_DELAY_START"
          value={delayStart}
          useDefault={{ whenValue: "DEFAULT", defaultValue: "no" }}
        />
        <ReviewValue
          label="SBD_STARTMODE"
          value={startmode}
          useDefault={{ whenValue: "DEFAULT", defaultValue: "always" }}
        />
        <ReviewValue
          label="SBD_WATCHDOG_TIMEOUT"
          value={watchdogTimeout}
          useDefault={{ whenValue: "", defaultValue: "5" }}
        />
        <ReviewValue
          label="SBD_TIMEOUT_ACTION"
          value={getSbdTimeout()}
          useDefault={{ whenValue: undefined, defaultValue: "flush,reboot" }}
        />
      </ReviewList>
    </TaskLibStep>
  );
};
