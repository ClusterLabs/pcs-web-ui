import React from "react";
import {
  DataListItem,
  DataListCell,
} from "@patternfly/react-core";

const ClusterStonith = ({ stonith: { name } }) => (
  <DataListItem aria-labelledby={name}>
    <DataListCell>
      {name}
    </DataListCell>
  </DataListItem>
);
export default ClusterStonith;
