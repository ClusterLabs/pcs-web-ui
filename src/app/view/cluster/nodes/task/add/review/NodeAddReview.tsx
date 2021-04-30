import React from "react";

import {
  ReviewDefault,
  ReviewList,
  ReviewValue,
  TaskLibStep,
} from "app/view/share";

import { useTask } from "../useTask";

export const NodeAddReview: React.FC = () => {
  const {
    isSbdEnabled,
    filledSbdDevices,
    filledNodeAddresses,
    state: { nodeName, reports, sbdWatchdog, sbdNoWatchdogValidation },
  } = useTask();

  return (
    <TaskLibStep title="Review settings" reports={reports}>
      <ReviewList>
        <ReviewValue label="Node name" value={nodeName} />
        <ReviewValue
          label="Node addresses"
          value={
            filledNodeAddresses.length === 0 ? (
              <>No address configured</>
            ) : (
              filledNodeAddresses.map((a, i) => <div key={i}>{a}</div>)
            )
          }
        />

        {isSbdEnabled && (
          <>
            <ReviewValue
              label="Sbd watchdog"
              value={
                <>
                  {sbdWatchdog.length > 0 && sbdWatchdog}
                  {sbdWatchdog.length === 0 && (
                    <>
                      <div>/dev/watchdog</div>
                      <ReviewDefault value="Default value" />
                    </>
                  )}
                </>
              }
            />
            <ReviewValue
              label="Sbd watchdog validation"
              value={sbdNoWatchdogValidation ? "Disabeld" : "Enabled"}
            />

            <ReviewValue
              label="Sbd devices"
              value={
                filledSbdDevices.length === 0 ? (
                  <>No sbd devices configured</>
                ) : (
                  filledSbdDevices.map((a, i) => <div key={i}>{a}</div>)
                )
              }
            />
          </>
        )}
      </ReviewList>
    </TaskLibStep>
  );
};
