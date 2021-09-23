import React from "react";

import {
  ReviewList,
  ReviewValue,
  ReviewYesNo,
  TaskLibStep,
} from "app/view/share";

import { useTask } from "./useTask";

export const Review: React.FC = () => {
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
        <ReviewValue label="Fence device name" value={fenceDeviceName} />
        <ReviewValue label="Fence device type" value={agentName} />
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
