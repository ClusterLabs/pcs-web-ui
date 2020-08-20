import React from "react";

import { types } from "app/store";
import {
  DetailLayout,
  UrlTabs,
  join,
  useGroupDetailViewContext,
  useMatch,
  useRoutesAnalysis,
} from "app/view";

import { useClusterFenceAgent } from "./useFenceAgent";
import { FenceDeviceDetailView } from "./FenceDeviceDetailView";
import { FenceDeviceArgumentsView } from "./arguments";

export const FenceDeviceView = ({
  fenceDevice,
}: {
  fenceDevice: types.cluster.FenceDevice;
}) => {
  useClusterFenceAgent(fenceDevice.agentName);
  const { urlPrefix } = useGroupDetailViewContext();
  const fenceDeviceUrlPrefix = join(urlPrefix, fenceDevice.id);
  const { tab, urlMap } = useRoutesAnalysis("Detail", {
    Detail: useMatch({ path: fenceDeviceUrlPrefix, exact: true }),
    Arguments: useMatch(join(fenceDeviceUrlPrefix, "arguments")),
  });
  return (
    <DetailLayout
      caption={fenceDevice.id}
      tabs={<UrlTabs tabSettingsMap={urlMap} currentTab={tab} />}
    >
      {tab === "Detail" && <FenceDeviceDetailView fenceDevice={fenceDevice} />}
      {tab === "Arguments" && (
        <FenceDeviceArgumentsView fenceDevice={fenceDevice} />
      )}
    </DetailLayout>
  );
};
