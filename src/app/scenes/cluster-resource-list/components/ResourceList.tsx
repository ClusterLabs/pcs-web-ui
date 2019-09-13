import React from "react";
import {
  DataList,
  DataListItem,
  DataListCell,
} from "@patternfly/react-core";

import { Resource } from "app/services/cluster/types";

const ClusterResourceList = ({ resourceList }: {
  resourceList: Resource[],
}) => (
  <DataList aria-label="Cluster resource list">
    {resourceList.map(resource => (
      <DataListItem key={resource.id} aria-labelledby={resource.id}>
        <DataListCell>
          {resource.id}
        </DataListCell>
      </DataListItem>
    ))}
  </DataList>
);
export default ClusterResourceList;
