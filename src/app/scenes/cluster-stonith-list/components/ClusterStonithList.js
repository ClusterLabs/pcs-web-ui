import React from "react";
import { DataList } from "@patternfly/react-core";

import ClusterStonith from "./ClusterStonith";

const ClusterStonithList = ({ fenceDeviceList }) => (
  <DataList aria-label="Cluster stonith list">
    {fenceDeviceList.map(stonith => (
      <ClusterStonith
        key={stonith.name}
        stonith={stonith}
      />
    ))}
  </DataList>
);
export default ClusterStonithList;
