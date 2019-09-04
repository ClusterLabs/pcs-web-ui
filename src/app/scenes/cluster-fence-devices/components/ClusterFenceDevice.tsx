import React from "react";
import {
  DataListItem,
  DataListCell,
} from "@patternfly/react-core";

import { FenceDevice } from "app/services/cluster/types";

const ClusterFenceDevice = ({ fenceDevice: { id } }: {
  fenceDevice: FenceDevice,
}) => (
  <DataListItem aria-labelledby={id}>
    <DataListCell>
      {id}
    </DataListCell>
  </DataListItem>
);
export default ClusterFenceDevice;
