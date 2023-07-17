import {testMarks} from "app/view/dataTest";
import {ReviewItem, ReviewList, ReviewYesNo, TaskLibStep} from "app/view/share";

import {useTask} from "./useTask";

const {review} = testMarks.createResource;

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
        <ReviewItem
          label="Resource name"
          value={resourceName}
          {...review.name.mark}
        />
        <ReviewItem
          label="Resource type"
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
                      key={attrName}
                      label={<span {...review.attr.name.mark}>{attrName}</span>}
                      value={instanceAttrs[attrName]}
                    />
                  </span>
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
          {...review.clone.mark}
        />

        <ReviewItem
          label="Group"
          value={
            <>
              {useGroup === "no" && <span {...review.noGroup.mark}>no</span>}
              {useGroup === "new" && (
                <span>
                  new group: <span {...review.newGroup.mark}>{group}</span>
                </span>
              )}
              {useGroup === "existing" && (
                <span>
                  existing group:{" "}
                  <span {...review.existingGroup.mark}>{group}</span>
                </span>
              )}
            </>
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
