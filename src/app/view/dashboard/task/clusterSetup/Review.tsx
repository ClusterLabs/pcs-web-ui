import React from "react";

import { ReviewList, ReviewValue, TaskLibStep } from "app/view/share";

import { useTask } from "./useTask";
export const Review: React.FC = () => {
  const {
    state: {
      nodeNameList,
      clusterName,
      libCall: { reports },
    },
  } = useTask();
  return (
    <TaskLibStep title="Review settings" reports={reports}>
      <ReviewList>
        <ReviewValue label="Cluster name" value={clusterName} />
        <ReviewValue
          label="Node addresses"
          value={nodeNameList.map((nodeName, i) => (
            <div key={i}>{nodeName}</div>
          ))}
        />
      </ReviewList>
    </TaskLibStep>
  );
};
