import React from "react";
import {
  DataListItem,
  DataListCell,
} from "@patternfly/react-core";

const ClusterNode = ({ nodeName, status }) => (
  <DataListItem aria-labelledby={nodeName}>
    <DataListCell>
      {nodeName}
    </DataListCell>
    <DataListCell>
      {status}
    </DataListCell>
  </DataListItem>
);
export default ClusterNode;
