import React from "react";
import {
  DataList,
  DataListItem,
  DataListCell,
} from "@patternfly/react-core";
import { ResourceTreeItem } from "app/services/cluster/types";
import { Link } from "react-router-dom";

import * as url from "app/common/urls";

const ClusterResourceTree = ({ resourceTree, createResourceDetailUrl }: {
  resourceTree: ResourceTreeItem[],
  createResourceDetailUrl: (id: string) => string,
}) => (
  <DataList aria-label="Cluster resource list">
    {resourceTree.map(resource => (
      <DataListItem key={resource.id} aria-labelledby={resource.id}>
        <DataListCell>
          <Link to={createResourceDetailUrl(resource.id)}>{resource.id}</Link>
        </DataListCell>
      </DataListItem>
    ))}
  </DataList>
);

ClusterResourceTree.createResourceDetailUrl = (
  (clusterUrlName: string) => (resourceUrlName: string) => url.resourcesDetail(
    clusterUrlName,
    resourceUrlName,
  )
);

export default ClusterResourceTree;
