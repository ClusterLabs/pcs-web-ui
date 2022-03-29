import {
  ReviewList,
  ReviewValue,
  ReviewYesNo,
  TaskLibStep,
} from "app/view/share";

import { useTask } from "./useTask";

export const Review = () => {
  const {
    state: {
      agentName,
      fenceDeviceName,
      instanceAttrs,
      libCall: { reports },
      disabled,
    },
  } = useTask();
  return (
    <TaskLibStep
      title="Review new fence device configuration"
      reports={reports}
    >
      <ReviewList>
        <ReviewValue
          label="Fence device name"
          value={fenceDeviceName}
          data-test="name"
        />
        <ReviewValue
          label="Fence device type"
          value={agentName}
          data-test="agentName"
        />
        <ReviewValue
          label="Instance attributes"
          value={
            Object.keys(instanceAttrs).length > 0 ? (
              <ReviewList>
                {Object.keys(instanceAttrs).map(attrName => (
                  <ReviewValue
                    key={attrName}
                    label={attrName}
                    value={instanceAttrs[attrName]}
                    data-test={`instanceAttr_${attrName}`}
                  />
                ))}
              </ReviewList>
            ) : (
              "No attribute configured"
            )
          }
        />

        <ReviewYesNo label="Disabled" value={disabled} />
      </ReviewList>
    </TaskLibStep>
  );
};
