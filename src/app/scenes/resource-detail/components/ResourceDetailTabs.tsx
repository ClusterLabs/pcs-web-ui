import React from "react";

import { ResourceTreeItem } from "app/services/cluster/types";

import ResourceDetailTabsPrimitive from "./ResourceDetailTabsPrimitive";
import ResourceDetailTabsGroup from "./ResourceDetailTabsGroup";
import ResourceDetailTabsClone from "./ResourceDetailTabsClone";

interface TabsSettings{
  resource:
    React.ComponentProps<typeof ResourceDetailTabsPrimitive>["currentTab"]
  ,
  group: React.ComponentProps<typeof ResourceDetailTabsGroup>["currentTab"],
  clone: React.ComponentProps<typeof ResourceDetailTabsClone>["currentTab"],
}
type TabsIntersection = (
  & TabsSettings["resource"]
  & TabsSettings["group"]
);

const ResourceDetailTabs = ({ clusterUrlName, resource, currentTabs }: {
  resource: ResourceTreeItem,
  clusterUrlName: string,
  currentTabs: TabsSettings|TabsIntersection,
}) => {
  const normalizedTabs = typeof currentTabs !== "string" ? currentTabs : ({
    resource: currentTabs,
    group: currentTabs,
    clone: currentTabs,
  });

  switch (resource.itemType) {
    case "resource": return (
      <ResourceDetailTabsPrimitive
        clusterUrlName={clusterUrlName}
        resourceUrlName={resource.id}
        currentTab={normalizedTabs.resource}
      />
    );
    case "group": return (
      <ResourceDetailTabsGroup
        clusterUrlName={clusterUrlName}
        resourceUrlName={resource.id}
        currentTab={normalizedTabs.group}
      />
    );
    case "clone": default: return (
      <ResourceDetailTabsClone
        clusterUrlName={clusterUrlName}
        resourceUrlName={resource.id}
        currentTab={normalizedTabs.clone}
      />
    );
  }
};

export default ResourceDetailTabs;
