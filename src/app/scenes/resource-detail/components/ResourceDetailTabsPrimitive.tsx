import React from "react";

import * as url from "app/common/urls";
import { UrlTabs } from "app/common/components";

const labelUrlCreateMap = {
  Details: url.resourcesDetail,
  Attributes: url.resourcesAttributes,
};


const ResourceDetailTabsPrimitive = (
  {
    clusterUrlName,
    resourceUrlName,
    currentTab,
  }: {
    clusterUrlName: string,
    resourceUrlName: string,
    currentTab: keyof typeof labelUrlCreateMap,
  },
) => {
  const tabSettingsMap = React.useMemo(
    UrlTabs.createLabelUrlMap(
      labelUrlCreateMap,
      (
        toUrl: (clusterUrlName: string, resourceUrlName: string) => string,
      ) => toUrl(clusterUrlName, resourceUrlName),
    ),
    [clusterUrlName, resourceUrlName],
  );
  return <UrlTabs tabSettingsMap={tabSettingsMap} currentTab={currentTab} />;
};

export default ResourceDetailTabsPrimitive;
