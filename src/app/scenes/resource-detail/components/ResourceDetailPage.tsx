import React from "react";
import { useSelector } from "react-redux";
import {
  PageSection,
  Stack,
  Alert,
} from "@patternfly/react-core";

import { selectors as clusterSelector } from "app/services/cluster";
import { ResourceTree } from "app/scenes/resource-tree";

import * as selector from "../selectors";
import ResourceDetailLayout from "./ResourceDetailLayout";
import ResourceDetailPrimitive from "./ResourceDetailPrimitive";
import ResourceDetailGroup from "./ResourceDetailGroup";
import ResourceDetailClone from "./ResourceDetailClone";

const ResourceDetailPage = ({ resourceUrlName, urlPrefix, closeUrl }: {
  resourceUrlName: string;
  urlPrefix: string;
  closeUrl: string;
}) => {
  const resourceTreeItem = useSelector(
    selector.getSelectedResource(resourceUrlName),
  );
  const cluster = useSelector(clusterSelector.getCluster);

  return (
    <PageSection className="ha-m-full-height pf-m-fill">
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
          <Stack gutter="md" className="pf-u-m-md">
            {!resourceTreeItem && (
              <ResourceDetailLayout
                closeUrl={closeUrl}
                caption={<strong>{resourceUrlName}</strong>}
              >
                <Alert
                  isInline
                  variant="danger"
                  title={`Resource "${resourceUrlName}" does not exist.`}
                />
              </ResourceDetailLayout>
            )}
            {resourceTreeItem && resourceTreeItem.itemType === "resource" && (
              <ResourceDetailPrimitive
                primitive={resourceTreeItem}
                urlPrefix={urlPrefix}
                closeUrl={closeUrl}
              />
            )}
            {resourceTreeItem && resourceTreeItem.itemType === "group" && (
              <ResourceDetailGroup
                group={resourceTreeItem}
                urlPrefix={urlPrefix}
                closeUrl={closeUrl}
              />
            )}
            {resourceTreeItem && resourceTreeItem.itemType === "clone" && (
              <ResourceDetailClone
                clone={resourceTreeItem}
                urlPrefix={urlPrefix}
                closeUrl={closeUrl}
              />
            )}
          </Stack>
        </div>
      </div>
    </PageSection>
  );
};

export default ResourceDetailPage;
