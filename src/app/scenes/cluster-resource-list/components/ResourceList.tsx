import React from "react";
import {
  DataList,
  DataListItem,
  DataListCell,
} from "@patternfly/react-core";

import { Resource } from "app/services/cluster/types";
import { Link } from "react-router-dom";

const ClusterResourceList = ({ resourceList, createResourceDetailUrl }: {
  resourceList: Resource[],
  createResourceDetailUrl: (id: string) => string,
}) => (
  <DataList aria-label="Cluster resource list">
    {resourceList.map(resource => (
      <DataListItem key={resource.id} aria-labelledby={resource.id}>
        <DataListCell>
          <Link to={createResourceDetailUrl(resource.id)}>{resource.id}</Link>
        </DataListCell>
      </DataListItem>
    ))}
  </DataList>
);

ClusterResourceList.createResourceDetailUrl = (
  (clusterUrlName: string) => (resourceUrlName: string) => (
    `/cluster/${clusterUrlName}/resources/${resourceUrlName}`
  )
);

export default ClusterResourceList;
