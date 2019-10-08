import React from "react";

import { ClusterView } from "app/services/cluster";
import { ResourceTree } from "app/scenes/resource-tree";

import ResourceDetailViewLayout from "./ResourceDetailViewLayout";

const ResourceDetailView = (
  {
    clusterUrlName,
    resourceUrlName,
    tabs,
    children,
  }: {
    clusterUrlName: string,
    resourceUrlName: string,
    tabs: React.ComponentProps<typeof ResourceDetailViewLayout>["tabs"],
    children: React.ComponentProps<typeof ResourceDetailViewLayout>["children"],
  },
) => (
  <ClusterView
    clusterUrlName={clusterUrlName}
    currentTab="Resources"
    pageSectionClassName="ha-m-full-height pf-m-fill"
  >
    {cluster => (
      <div className="pf-l-flex pf-u-align-items-flex-start pf-u-h-100">
        <div className="pf-c-card ha-c-panel__tree-view">
          <ResourceTree
            compact
            resourceTree={cluster.resourceTree}
            createResourceDetailUrl={
              ResourceTree.createResourceDetailUrl(cluster.urlName)
            }
          />
        </div>
        <div className="pf-c-card pf-m-flex-1 ha-c-panel__details-view">
          <ResourceDetailViewLayout
            cluster={cluster}
            resourceUrlName={resourceUrlName}
            tabs={tabs}
          >
            {children}
          </ResourceDetailViewLayout>
        </div>
      </div>
    )}
  </ClusterView>
);

export default ResourceDetailView;
