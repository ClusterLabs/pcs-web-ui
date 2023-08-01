import {testMarks} from "app/view/dataTest";
import {ReviewItem, ReviewList, TaskLibStep} from "app/view/share";

import {useTask} from "./useTask";

const {review} = testMarks.task.addNode;

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
        <ReviewItem
          label="Node name"
          value={nodeName}
          {...review.nodeName.mark}
        />
        <ReviewItem
          label="Node addresses"
          value={
            filledNodeAddresses.length === 0 ? (
              <>No address configured</>
            ) : (
              filledNodeAddresses.map((a, i) => (
                <div {...review.address.mark} key={i}>
                  {a}
                </div>
              ))
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
              {...review.sbdWatchdog.mark}
            />
            <ReviewItem
              label="Sbd watchdog validation"
              value={sbdNoWatchdogValidation ? "Disabled" : "Enabled"}
              {...review.sbdValidation.mark}
            />

            <ReviewItem
              label="Sbd devices"
              value={
                filledSbdDevices.length === 0 ? (
                  <>No sbd devices configured</>
                ) : (
                  filledSbdDevices.map((a, i) => (
                    <div {...review.sbdDevice.mark} key={i}>
                      {a}
                    </div>
                  ))
                )
              }
            />
          </>
        )}
      </ReviewList>
    </TaskLibStep>
  );
};
