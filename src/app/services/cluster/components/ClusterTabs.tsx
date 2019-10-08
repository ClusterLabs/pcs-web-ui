import React from "react";

import { UrlTabs } from "app/common/components";
import * as url from "app/common/urls";

const labelUrlCreateMap = {
  Detail: url.clusterDetail,
  Nodes: url.clusterNodes,
  Resources: url.clusterResources,
  "Fence Devices": url.clusterFenceDevices,
};

const ClusterTabs = ({ clusterUrlName, currentTab }: {
  clusterUrlName: string;
  currentTab: keyof typeof labelUrlCreateMap,
}) => {
  const tabSettingsMap = React.useMemo(
    UrlTabs.createLabelUrlMap(
      labelUrlCreateMap,
      (toUrl: (clusterUrlName: string) => string) => toUrl(clusterUrlName),
    ),
    [clusterUrlName],
  );
  return (
    <UrlTabs
      tabSettingsMap={tabSettingsMap}
      currentTab={currentTab}
    />
  );
};

export default ClusterTabs;
