import React from "react";
import { DataList } from "@patternfly/react-core";

import { Resource } from "app/services/cluster/types";

import ResourceListItem from "./ResourceListItem";

const ClusterResourceList = ({ resourceList }: {
  resourceList: Resource[],
}) => (
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
