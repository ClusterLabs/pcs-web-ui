import React from "react";
import { DataList } from "@patternfly/react-core";

import ClusterStonith from "./ClusterStonith";

const ClusterStonithList = ({ stonithList }) => (
  <DataList aria-label="Cluster stonith list">
    {stonithList.map(stonith => (
      <ClusterStonith
        key={stonith.name}
        stonith={stonith}
      />
    ))}
  </DataList>
);
export default ClusterStonithList;
