import {ReviewItem, ReviewList, TaskLibStep} from "app/view/share";

import {useTask} from "./useTask";

export const Review = () => {
  const {
    isSbdEnabled,
    filledSbdDevices,
    filledNodeAddresses,
    state: {
      nodeName,
      sbdWatchdog,
      sbdNoWatchdogValidation,
      libCall: {reports},
    },
  } = useTask();

  return (
    <TaskLibStep title="Review settings" reports={reports}>
      <ReviewList>
        <ReviewItem label="Node name" value={nodeName} />
        <ReviewItem
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
            <ReviewItem
              label="Sbd watchdog"
              value={sbdWatchdog}
              useDefault={{
                whenValue: "",
                defaultValue: "/dev/watchdog",
              }}
            />
            <ReviewItem
              label="Sbd watchdog validation"
              value={sbdNoWatchdogValidation ? "Disabled" : "Enabled"}
            />

            <ReviewItem
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
