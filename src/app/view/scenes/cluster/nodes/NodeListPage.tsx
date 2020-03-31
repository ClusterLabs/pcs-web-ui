import React from "react";
import { useDispatch } from "react-redux";
import { useRouteMatch } from "react-router";
import { PageSection } from "@patternfly/react-core";
import { push } from "connected-react-router";

import { types } from "app/store";

import { NodeList } from "./NodeList";
import { NodeDetailPage } from "./NodeDetailPage";

export const NodeListPage = ({ cluster, urlPrefix }:{
  cluster: types.cluster.ClusterState;
  urlPrefix: string;
}) => {
  const detail = useRouteMatch<{nodeUrlName: string}>(
    `${urlPrefix}/:nodeUrlName/`,
  );
  const dispatch = useDispatch();

  if (detail) {
    return (
      <PageSection
        className="ha-m-full-height pf-m-fill"
        aria-label="Cluster nodes"
      >
        <div className="pf-l-flex pf-u-align-items-flex-start pf-u-h-100">
          <div className="pf-c-card ha-c-panel__tree-view">
            <NodeList nodeList={cluster.nodeList} />
          </div>
          <div className="pf-c-card pf-m-flex-1 ha-c-panel__details-view">
            <NodeDetailPage
              caption={detail.params.nodeUrlName}
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
    <PageSection aria-label="Cluster nodes">
      <NodeList nodeList={cluster.nodeList} />
    </PageSection>
  );
};
