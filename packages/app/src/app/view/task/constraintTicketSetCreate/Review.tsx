import {ReviewItem, ReviewList, TaskLibStep} from "app/view/share";

import {useTask} from "./useTask";

export const Review = () => {
  const {
    state: {
      id,
      useCustomId,
      lossPolicy,
      sets,
      libCall: {reports},
    },
  } = useTask();

  return (
    <TaskLibStep title="Review settings" reports={reports}>
      <ReviewList>
        <ReviewItem
          label="Id"
          value={id}
          useDefault={{
            when: !useCustomId || id.length === 0,
            defaultValue: "Not set; will be generated",
          }}
        />

        <ReviewItem label="Loss policy" value={lossPolicy} />

        {sets.map((set, i) => (
          <ReviewItem
            key={i}
            label={`Resource set ${i + 1}`}
            value={
              <ReviewList>
                <ReviewItem
                  label="Resources"
                  value={set.resources.join(", ")}
                />
                <ReviewItem label="Role" value={set.role} />
              </ReviewList>
            }
          />
        ))}
      </ReviewList>
    </TaskLibStep>
  );
};
