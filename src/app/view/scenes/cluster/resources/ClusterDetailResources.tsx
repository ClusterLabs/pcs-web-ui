import React from "react";
import { useDispatch } from "react-redux";
import { useRouteMatch } from "react-router";
import { PageSection } from "@patternfly/react-core";
import { push } from "connected-react-router";

import { types } from "app/store";
import { ResourceTree } from "./tree";
import { ResourceDetailPage } from "./ResourceDetailPage";


export const ClusterDetailResources = ({ cluster, urlPrefix }:{
  cluster: types.cluster.ClusterState;
  urlPrefix: string;
}) => {
  const detail = useRouteMatch<{resourceUrlName: string}>(
    `${urlPrefix}/:resourceUrlName/`,
  );
  const dispatch = useDispatch();

  if (detail) {
    return (
      <PageSection
        className="ha-m-full-height pf-m-fill"
        aria-label="Cluster resources"
      >
        <div className="pf-l-flex pf-u-align-items-flex-start pf-u-h-100">
          <div className="pf-c-card ha-c-panel__tree-view">
            <ResourceTree
              compact
              resourceTree={cluster.resourceTree}
              clusterUrlName={cluster.urlName}
              selectedResourceId={detail.params.resourceUrlName}
            />
          </div>
          <div className="pf-c-card pf-m-flex-1 ha-c-panel__details-view">
            <ResourceDetailPage
              resourceUrlName={detail.params.resourceUrlName}
              urlPrefix={detail.url}
              onClose={(e: React.SyntheticEvent) => {
                e.preventDefault();
                dispatch(push(`${urlPrefix}/`));
              }}
            />
          </div>
        </div>
      </PageSection>
    );
  }

  return (
    <PageSection aria-label="Cluster resources">
      <ResourceTree
        resourceTree={cluster.resourceTree}
        clusterUrlName={cluster.urlName}
      />

    </PageSection>
  );
};
