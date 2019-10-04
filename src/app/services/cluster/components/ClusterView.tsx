import React from "react";
import { PageSection } from "@patternfly/react-core";

import { Page, UrlTabs, Spinner } from "app/common/components";
import * as url from "app/common/urls";
import { ClusterState } from "app/services/cluster/types";

import useClusterState from "../useClusterState";


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
  }:{
    clusterUrlName: string,
    currentTab: keyof typeof labelUrlCreateMap,
    pageSectionClassName?: string,
    children: (cluster: ClusterState) => JSX.Element,
  },
) => {
  const { cluster, dataLoaded } = useClusterState(clusterUrlName);
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
      <PageSection className={pageSectionClassName}>
        {!dataLoaded && <Spinner text="Loading data" />}
        {dataLoaded && children && children(cluster)}
      </PageSection>
    </Page>
  );
};

export default ClusterView;
