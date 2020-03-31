import React from "react";
import { useDispatch } from "react-redux";
import { useRouteMatch } from "react-router";
import { PageSection } from "@patternfly/react-core";
import { push } from "connected-react-router";

import { types } from "app/store";

import { GroupComponentProps, DetailComponentProps } from "./types";

export const GroupDetailView = ({
  cluster,
  urlPrefix,
  GroupComponent,
  DetailComponent,
}: {
  cluster: types.cluster.ClusterState;
  urlPrefix: string;
  GroupComponent: React.ComponentType<GroupComponentProps>,
  DetailComponent: React.ComponentType<DetailComponentProps>,
}) => {
  const detail = useRouteMatch<{detailUrlName: string}>(
    `${urlPrefix}/:detailUrlName/`,
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
            <GroupComponent
              cluster={cluster}
              detailUrlName={detail.params.detailUrlName}
            />
          </div>
          <div className="pf-c-card pf-m-flex-1 ha-c-panel__details-view">
            <DetailComponent
              detailUrlName={detail.params.detailUrlName}
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
      <GroupComponent cluster={cluster} />
    </PageSection>
  );
};
