import React from "react";
import { PageSection } from "@patternfly/react-core";

import { Page, PageSectionDataLoading, UrlTabs } from "app/common/components";

const labelUrlCreateMap = {
  Detail: (clusterUrlName: string) => `/cluster/${clusterUrlName}`,
  Nodes: (clusterUrlName: string) => `/cluster/${clusterUrlName}/nodes`,
  Resources: (clusterUrlName: string) => `/cluster/${clusterUrlName}/resources`,
  "Fence Devices": (clusterUrlName: string) => (
    `/cluster/${clusterUrlName}/fence-devices`
  ),
};

const ClusterPage = (
  {
    clusterUrlName,
    clusterDataLoaded,
    currentTab,
    pageSectionClassName = "",
    children,
  }:React.PropsWithChildren<{
    clusterUrlName: string,
    clusterDataLoaded: boolean,
    currentTab: keyof typeof labelUrlCreateMap,
    pageSectionClassName?: string,
  }>,
) => {
  const tabSettingsMap = React.useMemo(
    UrlTabs.createLabelUrlMap(
      labelUrlCreateMap,
      (toUrl: (clusterUrlName: string) => string) => toUrl(clusterUrlName),
    ),
    [clusterUrlName],
  );
  return (
    <Page>
      <PageSection variant="light">
        <UrlTabs
          tabSettingsMap={tabSettingsMap}
          currentTab={currentTab}
        />
      </PageSection>
      <PageSectionDataLoading
        done={clusterDataLoaded}
        className={pageSectionClassName}
      >
        {children}
      </PageSectionDataLoading>
    </Page>
  );
};

export default ClusterPage;
