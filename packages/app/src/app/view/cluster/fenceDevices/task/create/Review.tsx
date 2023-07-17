import {testMarks} from "app/view/dataTest";
import {ReviewItem, ReviewList, ReviewYesNo, TaskLibStep} from "app/view/share";

import {useTask} from "./useTask";

const {review} = testMarks.createFenceDevice;

export const Review = () => {
  const {
    state: {
      agentName,
      fenceDeviceName,
      instanceAttrs,
      libCall: {reports},
      disabled,
    },
  } = useTask();
  return (
    <TaskLibStep
      title="Review new fence device configuration"
      reports={reports}
      {...review.mark}
    >
      <ReviewList>
        <ReviewItem
          label="Fence device name"
          value={fenceDeviceName}
          {...review.name.mark}
        />
        <ReviewItem
          label="Fence device type"
          value={agentName}
          {...review.agentName.mark}
        />
        <ReviewItem
          label="Instance attributes"
          value={
            Object.keys(instanceAttrs).length > 0 ? (
              <ReviewList>
                {Object.keys(instanceAttrs).map(attrName => (
                  <span {...review.attr.mark} key={attrName}>
                    <ReviewItem
                      label={<span {...review.attr.name.mark}>{attrName}</span>}
                      value={instanceAttrs[attrName]}
                      {...review.attr.value.mark}
                    />
                  </span>
                ))}
              </ReviewList>
            ) : (
              "No attribute configured"
            )
          }
        />

        <ReviewYesNo
          label="Disabled"
          value={disabled}
          {...review.disabled.mark}
        />
      </ReviewList>
    </TaskLibStep>
  );
};
