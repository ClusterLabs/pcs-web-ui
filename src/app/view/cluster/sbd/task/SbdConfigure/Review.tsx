import { ReviewList, ReviewValue, TaskLibStep } from "app/view/share";

import { useTask } from "./useTask";

export const Review: React.FC = () => {
    const {
      state: {
        watchdogDict, 
        delayStart,
        startmode,
        watchdogTimeout,
        libCall: {reports},
      },
      timeoutAction,
    } = useTask();

    return (
      <TaskLibStep title="Review settings" reports={reports}>
        <ReviewList>
          <ReviewValue
            label="sbd watchdogs"
            value={
              <ReviewList>
                {Object.entries(watchdogDict).map(
                  ([nodeName, watchdog]) => (
                    <ReviewValue
                      key={nodeName}
                      label={nodeName}
                      value={watchdog}
                    />
                  ),
                )}
              </ReviewList>
            }/>
          <ReviewValue label="SBD_DELAY _START" value={delayStart === "DEFAULT" ? undefined : delayStart} />
          <ReviewValue label="SBD_STARTMODE" value={startmode === "DEFAULT" ? undefined : startmode} />
          <ReviewValue label="SBD_WATCHDOG _TIMEOUT" value={watchdogTimeout} />
          <ReviewValue label="SBD_TIMEOUT _ACTION" value={timeoutAction} />
        </ReviewList>
      </TaskLibStep>
    );
};
