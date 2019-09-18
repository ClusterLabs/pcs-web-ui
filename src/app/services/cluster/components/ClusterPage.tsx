import React from "react";
import { PageSection } from "@patternfly/react-core";

import { Page, PageSectionDataLoading, UrlTabs } from "app/common/components";
import * as url from "app/common/urls";

const labelUrlCreateMap = {
  Detail: url.clusterDetail,
  Nodes: url.clusterNodes,
  Resources: url.clusterResources,
  "Fence Devices": url.clusterFenceDevices,
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
