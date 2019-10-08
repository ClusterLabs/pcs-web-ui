import React from "react";

import {
  ResourceDetailView,
  ResourceDetailTabs,
} from "app/scenes/resource-detail";

import ResourceAttributes from "./ResourceAttributes";

const ResourceAttributesPage = ({ clusterUrlName, resourceUrlName }: {
  clusterUrlName: string,
  resourceUrlName: string,
}) => (
  <ResourceDetailView
    clusterUrlName={clusterUrlName}
    resourceUrlName={resourceUrlName}
    tabs={resource => (
      <ResourceDetailTabs
        resource={resource}
        clusterUrlName={clusterUrlName}
        currentTabs={{
          resource: "Attributes",
          group: "Details",
          clone: "Details",
        }}
      />
    )}
  >
    {resource => (
      <ResourceAttributes
        clusterUrlName={clusterUrlName}
        resourceTreeItem={resource}
      />
    )}
  </ResourceDetailView>
);

export default ResourceAttributesPage;
