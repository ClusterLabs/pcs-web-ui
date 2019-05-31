import React from "react";
import {
  DataListItem,
  DataListItemRow,
  DataListCell,
} from "@patternfly/react-core";

const ClusterNode = ({ nodeName, status }) => (
  <DataListItem aria-labelledby={nodeName}>
    <DataListItemRow>
      <DataListCell>
        {nodeName}
      </DataListCell>
      <DataListCell>
        {status}
      </DataListCell>
    </DataListItemRow>
  </DataListItem>
);
export default ClusterNode;
