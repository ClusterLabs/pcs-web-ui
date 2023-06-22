import {ReviewItem, ReviewList, ReviewYesNo, TaskLibStep} from "app/view/share";

import {useTask} from "./useTask";

export const Review = () => {
  const {
    state: {
      agentName,
      resourceName,
      instanceAttrs,
      libCall: {reports},
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
        <ReviewItem label="Resource name" value={resourceName} />
        <ReviewItem label="Resource type" value={agentName} />
        <ReviewItem
          label="Instance attributes"
          value={
            Object.keys(instanceAttrs).length > 0 ? (
              <ReviewList>
                {Object.keys(instanceAttrs).map(attrName => (
                  <ReviewItem
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

        <ReviewItem
          label="Clone"
          value={clone ? `yes${promotable ? " - promotable" : ""}` : "no"}
        />

        <ReviewItem
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
