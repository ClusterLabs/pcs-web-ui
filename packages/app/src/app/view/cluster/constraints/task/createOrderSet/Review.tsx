import {ReviewItem, ReviewList, ReviewYesNo, TaskLibStep} from "app/view/share";

import {useTask} from "./useTask";

export const Review = () => {
  const {
    state: {
      id,
      useCustomId,
      libCall: {reports},
      sets,
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
                <ReviewItem label="Action" value={set.action} />
                <ReviewYesNo label="Sequential" value={set.sequential} />
                <ReviewYesNo label="Require all" value={set.requireAll} />
              </ReviewList>
            }
          />
        ))}
      </ReviewList>
    </TaskLibStep>
  );
};
