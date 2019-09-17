import React from "react";

import { Page, PageSectionDataLoading } from "app/common/components";

import ClusterTabsSection, { TABS } from "./ClusterTabsSection";

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
    currentTab: TABS,
    pageSectionClassName?: string,
  }>,
) => (
  <Page>
    <ClusterTabsSection
      clusterUrlName={clusterUrlName}
      currentTab={currentTab}
    />
    <PageSectionDataLoading
      done={clusterDataLoaded}
      className={pageSectionClassName}
    >
      {children}
    </PageSectionDataLoading>
  </Page>
);

export default ClusterPage;
