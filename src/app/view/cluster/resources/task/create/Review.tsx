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
      resourceName,
      instanceAttrs,
      reports,
      clone,
      promotable,
      useGroup,
      group,
      disabled,
    },
  } = useTask();
  return (
    <TaskLibStep title="Review new resource configuration" reports={reports}>
      <ReviewList>
        <ReviewValue label="Resource name" value={resourceName} />
        <ReviewValue label="Resource type" value={agentName} />
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

        <ReviewValue
          label="Clone"
          value={clone ? `yes${promotable ? " - promotable" : ""}` : "no"}
        />

        <ReviewValue
          label="Group"
          value={
            <>
              {useGroup === "no" && "no"}
              {useGroup === "new" && `new group: ${group}`}
              {useGroup === "existing" && `existing group: ${group}`}
            </>
          }
        />

        <ReviewYesNo label="Disabled" value={disabled} />
      </ReviewList>
    </TaskLibStep>
  );
};
