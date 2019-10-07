import React from "react";
import { StackItem } from "@patternfly/react-core";

import * as url from "app/common/urls";
import { UrlTabs } from "app/common/components";

const labelUrlCreateMap = {
  Details: url.resourcesDetail,
  Attributes: url.resourcesAttributes,
};

export type ResourceDetailTab = keyof typeof labelUrlCreateMap;

const ResourceDetailSectionTabs = (
  {
    clusterUrlName,
    resourceUrlName,
    currentTab,
  }: {
    clusterUrlName: string,
    resourceUrlName: string,
    currentTab: ResourceDetailTab,
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
  return (
    <StackItem>
      <UrlTabs tabSettingsMap={tabSettingsMap} currentTab={currentTab} />
    </StackItem>
  );
};

export default ResourceDetailSectionTabs;
