import React from "react";

import {
  ReviewDefault,
  ReviewList,
  ReviewValue,
  TaskLibStep,
} from "app/view/share";

import { useTask } from "./useTask";

export const Review: React.FC = () => {
  const {
    state: { id, lossPolicy, reports, sets },
  } = useTask();

  return (
    <TaskLibStep title="Review settings" reports={reports}>
      <ReviewList>
        <ReviewValue
          label="Id"
          value={
            id.length > 0 ? (
              id
            ) : (
              <ReviewDefault value="Not set; will be generated" />
            )
          }
        />

        <ReviewValue label="Loss policy" value={lossPolicy} />

        {sets.map((set, i) => (
          <ReviewValue
            key={i}
            label={`Resource set ${i + 1}`}
            value={
              <ReviewList>
                <ReviewValue
                  label="Resources"
                  value={set.resources.join(", ")}
                />
                <ReviewValue label="Role" value={set.role} />
              </ReviewList>
            }
          />
        ))}
      </ReviewList>
    </TaskLibStep>
  );
};
