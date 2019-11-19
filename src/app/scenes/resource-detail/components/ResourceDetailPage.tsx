import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  PageSection,
  Stack,
  Alert,
} from "@patternfly/react-core";
import { push } from "connected-react-router";

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
  const dispatch = useDispatch();
  const onClose = (e: React.SyntheticEvent) => {
    e.preventDefault();
    dispatch(push(closeUrl));
  };

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
            selectedResourceId={resourceUrlName}
          />
        </div>
        <div className="pf-c-card pf-m-flex-1 ha-c-panel__details-view">
          <Stack gutter="md" className="pf-u-m-md">
            {!resourceTreeItem && (
              <ResourceDetailLayout
                onClose={onClose}
                caption={<strong>{resourceUrlName}</strong>}
              >
                <Alert
                  isInline
                  variant="danger"
                  title={`Resource "${resourceUrlName}" does not exist.`}
                />
              </ResourceDetailLayout>
            )}
            {resourceTreeItem && resourceTreeItem.itemType === "primitive" && (
              <ResourceDetailPrimitive
                primitive={resourceTreeItem}
                urlPrefix={urlPrefix}
                onClose={onClose}
              />
            )}
            {resourceTreeItem && resourceTreeItem.itemType === "group" && (
              <ResourceDetailGroup
                group={resourceTreeItem}
                urlPrefix={urlPrefix}
                onClose={onClose}
              />
            )}
            {resourceTreeItem && resourceTreeItem.itemType === "clone" && (
              <ResourceDetailClone
                clone={resourceTreeItem}
                urlPrefix={urlPrefix}
                onClose={onClose}
              />
            )}
          </Stack>
        </div>
      </div>
    </PageSection>
  );
};

export default ResourceDetailPage;
