import React from "react";
import { useSelector } from "react-redux";
import { PageSection } from "@patternfly/react-core";

import { Page, PageSectionDataLoading, UrlTabs } from "app/common/components";
import * as url from "app/common/urls";

import * as selectors from "../selectors";

const labelUrlCreateMap = {
  Detail: url.clusterDetail,
  Nodes: url.clusterNodes,
  Resources: url.clusterResources,
  "Fence Devices": url.clusterFenceDevices,
};

const ClusterView = (
  {
    clusterUrlName,
    currentTab,
    pageSectionClassName = "",
    children,
  }:React.PropsWithChildren<{
    clusterUrlName: string,
    currentTab: keyof typeof labelUrlCreateMap,
    pageSectionClassName?: string,
  }>,
) => {
  const dataLoaded = useSelector(selectors.areDataLoaded);
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
        done={dataLoaded}
        className={pageSectionClassName}
      >
        {children}
      </PageSectionDataLoading>
    </Page>
  );
};

export default ClusterView;
