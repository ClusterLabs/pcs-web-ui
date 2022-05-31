import { PageSection } from "@patternfly/react-core";

import { Router, useLocation, useRoute, useRouter } from "app/view/share";

import { GroupDetailViewContextProvider } from "./GroupDetailViewContext";

export const GroupDetailView = ({
  groupCard,
  detailCard,
}: {
  groupCard: React.ReactNode;
  detailCard: React.ReactNode;
}) => {
  const detail = useRoute("/:detailUrlName/*");
  const { base } = useRouter();
  const { navigate } = useLocation();
  const closeDetailUrl = () => navigate(`~${base}`);

  if (detail !== null) {
    return (
      <PageSection className="ha-m-full-height pf-m-fill">
        <div className="pf-l-flex pf-u-align-items-flex-start pf-u-h-100">
          <GroupDetailViewContextProvider
            value={{
              compact: true,
              selectedItemUrlName: detail.params.detailUrlName,
              closeDetailUrl,
            }}
          >
            <div className="pf-c-card ha-c-panel__tree-view">{groupCard}</div>
            <div className="pf-c-card pf-m-flex-1 ha-c-panel__details-view">
              <Router base={detail.matched}>{detailCard}</Router>
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
          compact: false,
          selectedItemUrlName: "",
          closeDetailUrl,
        }}
      >
        {groupCard}
      </GroupDetailViewContextProvider>
    </PageSection>
  );
};
