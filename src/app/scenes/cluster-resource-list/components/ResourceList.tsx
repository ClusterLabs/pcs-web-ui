import React from "react";
import { DataList } from "@patternfly/react-core";

import { Resource } from "app/services/cluster/types";

import ResourceListItem from "./ResourceListItem";

export interface Props {
  resourceList: Resource[],
}

const ClusterResourceList = ({ resourceList }: Props) => (
  <DataList aria-label="Cluster resource list">
    {resourceList.map(resource => (
      <ResourceListItem
        key={resource.id}
        resource={resource}
      />
    ))}
  </DataList>
);
export default ClusterResourceList;
