import React from "react";
import {
  DataListItem,
  DataListItemRow,
  DataListCell,
} from "@patternfly/react-core";

import { Node } from "app/services/cluster/types";

const ClusterNode = ({ nodeName, status }: {
  nodeName: string,
  status: Node["status"],
}) => (
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
