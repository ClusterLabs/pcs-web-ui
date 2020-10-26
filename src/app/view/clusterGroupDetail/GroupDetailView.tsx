import React from "react";
import { useRouteMatch } from "react-router";
import { PageSection } from "@patternfly/react-core";

import { GroupDetailViewContextProvider } from "./GroupDetailViewContext";

export const GroupDetailView = ({
  urlPrefix,
  groupCard,
  detailCard,
}: {
  urlPrefix: string;
  groupCard: React.ReactNode;
  detailCard: React.ReactNode;
}) => {
  const detail = useRouteMatch<{ detailUrlName: string }>(
    `${urlPrefix}/:detailUrlName/`,
  );

  if (detail) {
    return (
      <PageSection className="ha-m-full-height pf-m-fill">
        <div className="pf-l-flex pf-u-align-items-flex-start pf-u-h-100">
          <GroupDetailViewContextProvider
            value={{
              urlPrefix,
              compact: true,
              selectedItemUrlName: detail.params.detailUrlName,
            }}
          >
            <div className="pf-c-card ha-c-panel__tree-view">{groupCard}</div>
            <div className="pf-c-card pf-m-flex-1 ha-c-panel__details-view">
              {detailCard}
            </div>
          </GroupDetailViewContextProvider>
        </div>
      </PageSection>
    );
  }

  return (
    <PageSection>
      <GroupDetailViewContextProvider
        value={{
          urlPrefix,
          compact: false,
          selectedItemUrlName: "",
        }}
      >
        {groupCard}
      </GroupDetailViewContextProvider>
    </PageSection>
  );
};
