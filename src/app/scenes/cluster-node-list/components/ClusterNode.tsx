import React from "react";
import {
  DataListItem,
  DataListItemRow,
  DataListCell,
} from "@patternfly/react-core";

import { NODE_STATUS } from "app/services/cluster/types";

const ClusterNode = ({ nodeName, status }: {
  nodeName: string,
  status: NODE_STATUS,
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
