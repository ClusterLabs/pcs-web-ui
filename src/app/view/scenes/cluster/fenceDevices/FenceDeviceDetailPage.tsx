import React from "react";
import { useSelector } from "react-redux";

import { selectors } from "app/store";
import {
  DetailLayout,
  UrlTabs,
  useGroupDetailViewContext,
} from "app/view/common";
import { useSelectedClusterName } from "app/view/scenes/cluster";
import { analyzeRoutes, join, useMatch } from "app/view/utils";

import { FenceDeviceDetailView } from "./FenceDeviceDetailView";
import { FenceDeviceDoesNotExists } from "./FenceDeviceDoesNotExists";

export const FenceDeviceDetailPage = () => {
  const { selectedItemUrlName, urlPrefix } = useGroupDetailViewContext();

  const fenceDevice = useSelector(
    selectors.getSelectedFenceDevice(
      useSelectedClusterName(),
      selectedItemUrlName,
    ),
  );

  const fenceDeviceUrlPrefix = join(urlPrefix, selectedItemUrlName);
  const { tab, urlMap } = analyzeRoutes("Detail", {
    Detail: useMatch({ path: fenceDeviceUrlPrefix, exact: true }),
    Arguments: useMatch(join(fenceDeviceUrlPrefix, "arguments")),
  });

  if (!fenceDevice) {
    return (
      <FenceDeviceDoesNotExists fenceDeviceUrlName={selectedItemUrlName} />
    );
  }
  return (
    <DetailLayout
      caption={selectedItemUrlName}
      tabs={<UrlTabs tabSettingsMap={urlMap} currentTab={tab} />}
    >
      {tab === "Detail" && <FenceDeviceDetailView fenceDevice={fenceDevice} />}
      {tab === "Arguments" && <div />}
    </DetailLayout>
  );
};
